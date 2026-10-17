import { ASR_SCHOOLS, CALCULATION_METHODS, DEFAULT_SETTINGS } from './prayer-times.js'

export const SETTINGS_STORAGE_KEY = 'prayer-app-settings'

const allowedValues = {
  calculationMethod: CALCULATION_METHODS.map(({ value }) => value),
  asrSchool: ASR_SCHOOLS.map(({ value }) => value),
  timeFormat: ['12h', '24h'],
  theme: ['system', 'light', 'dark'],
}

export function isValidSetting(key, value) {
  return Object.hasOwn(allowedValues, key) && allowedValues[key].includes(value)
}

export function normalizeSettings(value) {
  const settings = { ...DEFAULT_SETTINGS }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return settings
  }

  for (const key of Object.keys(settings)) {
    if (isValidSetting(key, value[key])) {
      settings[key] = value[key]
    }
  }

  return settings
}
