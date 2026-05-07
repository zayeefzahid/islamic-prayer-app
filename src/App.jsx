import { useEffect, useMemo, useState } from 'react'
import AppHeader from '@/components/AppHeader.jsx'
import DailyReflection from '@/components/DailyReflection.jsx'
import NextPrayerHero from '@/components/NextPrayerHero.jsx'
import PrayerSchedule from '@/components/PrayerSchedule.jsx'
import SettingsPanel from '@/components/SettingsPanel.jsx'
import { ErrorState, LoadingState, NoticeBanner } from '@/components/StatusStates.jsx'
import { DEFAULT_LOCATION, DEFAULT_SETTINGS, getPrayerTimeline } from '@/lib/prayer-times.js'
import {
  enrichLocationName,
  fetchPrayerTimes,
  getDeviceLocation,
  getFallbackPrayerData,
} from '@/services/prayer-api.js'
import './App.css'

const SETTINGS_STORAGE_KEY = 'prayer-app-settings'

function readStoredSettings() {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS
  }

  try {
    const savedSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    return savedSettings
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) }
      : DEFAULT_SETTINGS
  } catch (error) {
    console.warn('Unable to read prayer app settings:', error)
    return DEFAULT_SETTINGS
  }
}

function App() {
  const [settings, setSettings] = useState(readStoredSettings)
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [locationReady, setLocationReady] = useState(false)
  const [locationBusy, setLocationBusy] = useState(false)
  const [prayerData, setPrayerData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const { asrSchool, calculationMethod } = settings

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const shouldUseDarkTheme =
        settings.theme === 'dark' || (settings.theme === 'system' && mediaQuery.matches)

      document.documentElement.classList.toggle('dark', shouldUseDarkTheme)
      document.documentElement.style.colorScheme = shouldUseDarkTheme ? 'dark' : 'light'
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)

    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [settings.theme])

  useEffect(() => {
    let cancelled = false

    async function resolveLocation() {
      setLocationBusy(true)

      try {
        const deviceLocation = await getDeviceLocation()
        const namedLocation = await enrichLocationName(deviceLocation)

        if (!cancelled) {
          setLocation(namedLocation)
          setNotice('')
        }
      } catch (locationError) {
        if (!cancelled) {
          setLocation(DEFAULT_LOCATION)
          setNotice(
            `Location permission was unavailable, so the app is using ${DEFAULT_LOCATION.label}.`
          )
          console.warn('Using default prayer location:', locationError)
        }
      } finally {
        if (!cancelled) {
          setLocationReady(true)
          setLocationBusy(false)
        }
      }
    }

    resolveLocation()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!locationReady) {
      return
    }

    let cancelled = false

    async function loadPrayerTimes() {
      const prayerSettings = { asrSchool, calculationMethod }

      setStatus((currentStatus) => (currentStatus === 'ready' ? 'refreshing' : 'loading'))
      setError('')

      try {
        const livePrayerData = await fetchPrayerTimes({ location, settings: prayerSettings })

        if (!cancelled) {
          setPrayerData(livePrayerData)
          setStatus('ready')
        }
      } catch (fetchError) {
        if (!cancelled) {
          setPrayerData(getFallbackPrayerData(location, prayerSettings))
          setStatus('ready')
          setError(
            'Live prayer times could not be reached. Showing fallback sample times until the service responds.'
          )
          console.warn('Prayer time fetch failed:', fetchError)
        }
      }
    }

    loadPrayerTimes()

    return () => {
      cancelled = true
    }
  }, [asrSchool, calculationMethod, locationReady, location, refreshKey])

  const timeline = useMemo(() => {
    if (!prayerData?.timings) {
      return null
    }

    return getPrayerTimeline(prayerData.timings, now)
  }, [now, prayerData])

  const updateSetting = (key, value) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }))
  }

  const useDeviceLocation = async () => {
    setLocationBusy(true)
    setLocationReady(false)
    setNotice('Checking your device location...')
    setError('')

    try {
      const deviceLocation = await getDeviceLocation()
      const namedLocation = await enrichLocationName(deviceLocation)
      setLocation(namedLocation)
      setNotice('Using your device location for today\'s prayer times.')
    } catch (locationError) {
      setNotice(`Location could not be updated. Keeping ${location.label}.`)
      console.warn('Device location request failed:', locationError)
    } finally {
      setLocationReady(true)
      setLocationBusy(false)
    }
  }

  const refreshPrayerTimes = () => {
    setRefreshKey((currentKey) => currentKey + 1)
  }

  const isInitialLoading = status === 'loading' && !prayerData
  const isRefreshing = status === 'refreshing' || locationBusy

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to prayer times
      </a>

      <div className="app-frame">
        <AppHeader
          date={prayerData?.date}
          isRefreshing={isRefreshing}
          location={location}
          onRefresh={refreshPrayerTimes}
          onToggleSettings={() => setSettingsOpen((isOpen) => !isOpen)}
          settingsOpen={settingsOpen}
        />

        <main id="main-content" className="app-grid">
          <div className="primary-column">
            {notice ? <NoticeBanner tone="info" message={notice} /> : null}
            {error ? <NoticeBanner tone="warning" message={error} /> : null}

            {isInitialLoading ? (
              <LoadingState />
            ) : timeline && prayerData ? (
              <>
                <NextPrayerHero
                  currentPrayer={timeline.currentPrayer}
                  date={prayerData.date}
                  location={location}
                  nextPrayer={timeline.nextPrayer}
                  progress={timeline.progress}
                  remainingMs={timeline.remainingMs}
                  timeFormat={settings.timeFormat}
                />

                <PrayerSchedule
                  calculationLabel={prayerData.meta.calculationMethod}
                  prayers={timeline.schedule}
                  timeFormat={settings.timeFormat}
                />
              </>
            ) : (
              <ErrorState onRetry={refreshPrayerTimes} />
            )}
          </div>

          <div className="secondary-column">
            <SettingsPanel
              isBusy={isRefreshing}
              isOpen={settingsOpen}
              location={location}
              onUseDeviceLocation={useDeviceLocation}
              onUpdateSetting={updateSetting}
              settings={settings}
            />

            {prayerData ? <DailyReflection /> : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
