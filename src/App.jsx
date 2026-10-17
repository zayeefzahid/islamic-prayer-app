import { useEffect, useMemo, useState } from 'react'
import { Github, Star } from 'lucide-react'
import AppHeader from '@/components/AppHeader.jsx'
import DailyReflection from '@/components/DailyReflection.jsx'
import NextPrayerHero from '@/components/NextPrayerHero.jsx'
import PrayerSchedule from '@/components/PrayerSchedule.jsx'
import SettingsPanel from '@/components/SettingsPanel.jsx'
import { ErrorState, LoadingState, NoticeBanner } from '@/components/StatusStates.jsx'
import { useLocation } from '@/hooks/use-location.js'
import { useSettings } from '@/hooks/use-settings.js'
import { DEFAULT_LOCATION, getPrayerTimeline } from '@/lib/prayer-times.js'
import { fetchPrayerTimes, getFallbackPrayerData } from '@/services/prayer-api.js'
import './App.css'

function App() {
  const { settings, updateSetting } = useSettings()
  const {
    location,
    ready: locationReady,
    busy: locationBusy,
    notice,
    requestLocation,
  } = useLocation()
  const [prayerData, setPrayerData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const { asrSchool, calculationMethod } = settings
  const scheduleDay = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!locationReady) {
      return
    }

    let cancelled = false
    const controller = new AbortController()

    async function loadPrayerTimes() {
      const prayerSettings = { asrSchool, calculationMethod }

      setStatus((currentStatus) => (currentStatus === 'ready' ? 'refreshing' : 'loading'))
      setError('')

      try {
        const livePrayerData = await fetchPrayerTimes({
          location,
          settings: prayerSettings,
          signal: controller.signal,
        })

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
      controller.abort()
    }
  }, [asrSchool, calculationMethod, locationReady, location, refreshKey, scheduleDay])

  const timeline = useMemo(() => {
    if (!prayerData?.timings) {
      return null
    }

    return getPrayerTimeline(prayerData.timings, now)
  }, [now, prayerData])

  const refreshPrayerTimes = () => {
    setRefreshKey((currentKey) => currentKey + 1)
  }

  const isInitialLoading = status === 'loading' && !prayerData
  const isRefreshing = status === 'refreshing' || locationBusy

  return (
    <div className="app-shell" data-theme={settings.theme}>
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
            {location.source === DEFAULT_LOCATION.source ? (
              <section className="location-prompt" aria-labelledby="location-prompt-title">
                <div>
                  <h2 id="location-prompt-title">Allow location for local prayer times</h2>
                  <p>
                    Use your device location to find prayer times near you. Choose Allow
                    when your browser asks. You can keep using {location.label} instead.
                  </p>
                  <p className="location-permission-help">
                    Already blocked? Enable location in your browser’s site permissions, then try again.
                  </p>
                </div>
                <button
                  className="secondary-button"
                  type="button"
                  disabled={locationBusy}
                  onClick={requestLocation}
                >
                  {locationBusy ? 'Checking location…' : 'Allow location'}
                </button>
              </section>
            ) : null}
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
              onUseDeviceLocation={requestLocation}
              onUpdateSetting={updateSetting}
              settings={settings}
            />

            {prayerData ? <DailyReflection /> : null}
          </div>
        </main>

        <footer className="app-credit">
          <span>Made for the Muslim community</span>
          <span aria-hidden="true"> · </span>
          <span>By <a href="https://zayeef.com" target="_blank" rel="noopener noreferrer">zayeef.com</a></span>
          <a
            className="github-star-link"
            href="https://github.com/zayeefzahid/islamic-prayer-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={15} aria-hidden="true" />
            Star on GitHub
            <Star size={14} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </div>
  )
}

export default App
