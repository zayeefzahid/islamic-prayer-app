import { useCallback, useEffect, useState } from 'react'
import { isValidSetting, normalizeSettings, SETTINGS_STORAGE_KEY } from '@/lib/settings.js'

function readSettings() {
  try {
    return normalizeSettings(JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY)))
  } catch {
    return normalizeSettings(null)
  }
}

export function useSettings() {
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // Preferences still work for this session when storage is unavailable.
    }
  }, [settings])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const dark = settings.theme === 'dark' || (settings.theme === 'system' && media.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }

    applyTheme()
    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [settings.theme])

  const updateSetting = useCallback((key, value) => {
    if (isValidSetting(key, value)) {
      setSettings(current => current[key] === value ? current : { ...current, [key]: value })
    }
  }, [])

  return { settings, updateSetting }
}
