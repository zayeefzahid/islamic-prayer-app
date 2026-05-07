import {
  DEFAULT_LOCATION,
  formatCoordinates,
  formatReadableDate,
  getCalculationMethodLabel,
} from '@/lib/prayer-times.js'

const PRAYER_API_BASE = (import.meta.env.VITE_PRAYER_API_URL || 'https://api.aladhan.com/v1').replace(
  /\/$/,
  ''
)
const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

async function fetchJson(url, timeout = 10000) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

function buildLocationLabel(location) {
  if (location.city && location.country) {
    return `${location.city}, ${location.country}`
  }

  if (location.city) {
    return location.city
  }

  return formatCoordinates(location.latitude, location.longitude)
}

function normalizePrayerResponse(data, location, settings) {
  const hijri = data.date?.hijri
  const methodName = data.meta?.method?.name || getCalculationMethodLabel(settings.calculationMethod)

  return {
    timings: data.timings,
    date: {
      gregorian:
        data.date?.gregorian?.weekday?.en && data.date?.readable
          ? `${data.date.gregorian.weekday.en}, ${data.date.readable}`
          : formatReadableDate(),
      hijri: hijri ? `${hijri.day} ${hijri.month.en} ${hijri.year}` : '',
    },
    meta: {
      calculationMethod: methodName,
      source: 'Aladhan Prayer Times API',
      timezone: data.meta?.timezone || '',
    },
    location: {
      ...location,
      label: buildLocationLabel(location),
    },
  }
}

export function getDeviceLocation() {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return Promise.reject(new Error('Geolocation is not supported in this browser.'))
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          city: '',
          country: '',
          label: formatCoordinates(position.coords.latitude, position.coords.longitude),
          source: 'Device location',
        })
      },
      (error) => {
        reject(new Error(error.message || 'Location permission was not granted.'))
      },
      {
        enableHighAccuracy: false,
        maximumAge: 10 * 60 * 1000,
        timeout: 9000,
      }
    )
  })
}

export async function enrichLocationName(location) {
  const url = new URL(REVERSE_GEOCODE_URL)
  url.searchParams.set('latitude', location.latitude)
  url.searchParams.set('longitude', location.longitude)
  url.searchParams.set('localityLanguage', 'en')

  try {
    const data = await fetchJson(url, 6500)
    const city =
      data.city || data.locality || data.principalSubdivision || data.localityInfo?.administrative?.[2]?.name
    const country = data.countryName || data.countryCode || ''

    return {
      ...location,
      city: city || 'Current location',
      country,
      label: buildLocationLabel({
        ...location,
        city: city || 'Current location',
        country,
      }),
      source: 'Device location',
    }
  } catch (error) {
    console.warn('Reverse geocoding failed:', error)
    return {
      ...location,
      city: 'Current location',
      label: buildLocationLabel(location),
      source: 'Device location',
    }
  }
}

export async function fetchPrayerTimes({ location = DEFAULT_LOCATION, settings }) {
  const url = new URL(`${PRAYER_API_BASE}/timings/${Math.floor(Date.now() / 1000)}`)

  url.searchParams.set('latitude', location.latitude)
  url.searchParams.set('longitude', location.longitude)
  url.searchParams.set('method', settings.calculationMethod)
  url.searchParams.set('school', settings.asrSchool)

  const payload = await fetchJson(url)

  if (payload.code !== 200 || !payload.data?.timings) {
    throw new Error(payload.status || 'Prayer time response was not usable.')
  }

  return normalizePrayerResponse(payload.data, location, settings)
}

export function getFallbackPrayerData(location = DEFAULT_LOCATION, settings) {
  return {
    timings: {
      Fajr: '05:30',
      Sunrise: '06:45',
      Dhuhr: '12:15',
      Asr: '15:30',
      Maghrib: '18:15',
      Isha: '19:45',
    },
    date: {
      gregorian: formatReadableDate(),
      hijri: 'Hijri date unavailable offline',
    },
    meta: {
      calculationMethod: getCalculationMethodLabel(settings.calculationMethod),
      source: 'Offline fallback',
      timezone: '',
    },
    location: {
      ...location,
      label: buildLocationLabel(location),
    },
  }
}
