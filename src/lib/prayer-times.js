export const DEFAULT_SETTINGS = {
  calculationMethod: '2',
  asrSchool: '0',
  timeFormat: '12h',
  theme: 'system',
}

export const DEFAULT_LOCATION = {
  latitude: 40.7128,
  longitude: -74.006,
  accuracy: null,
  city: 'New York',
  country: 'United States',
  label: 'New York, United States',
  source: 'Default location',
}

export const CALCULATION_METHODS = [
  {
    value: '2',
    label: 'North America',
    helper: 'A practical default for the United States and Canada.',
  },
  {
    value: '3',
    label: 'Muslim World League',
    helper: 'A widely used global convention.',
  },
  {
    value: '1',
    label: 'Karachi',
    helper: 'Common across Pakistan, India, and Bangladesh.',
  },
  {
    value: '4',
    label: 'Umm al-Qura, Makkah',
    helper: 'Often used in Saudi Arabia.',
  },
  {
    value: '5',
    label: 'Egyptian Authority',
    helper: 'Common in Egypt and nearby regions.',
  },
]

export const ASR_SCHOOLS = [
  {
    value: '0',
    label: 'Standard',
    helper: 'Shafi, Maliki, and Hanbali.',
  },
  {
    value: '1',
    label: 'Hanafi',
    helper: 'Uses the later Asr calculation.',
  },
]

export const PRAYER_SEQUENCE = [
  {
    key: 'Fajr',
    label: 'Fajr',
    description: 'Dawn prayer',
    type: 'prayer',
  },
  {
    key: 'Sunrise',
    label: 'Sunrise',
    description: 'End of Fajr time',
    type: 'sun',
  },
  {
    key: 'Dhuhr',
    label: 'Dhuhr',
    description: 'Midday prayer',
    type: 'prayer',
  },
  {
    key: 'Asr',
    label: 'Asr',
    description: 'Afternoon prayer',
    type: 'prayer',
  },
  {
    key: 'Maghrib',
    label: 'Maghrib',
    description: 'Sunset prayer',
    type: 'prayer',
  },
  {
    key: 'Isha',
    label: 'Isha',
    description: 'Night prayer',
    type: 'prayer',
  },
]

const TIME_MATCHER = /(\d{1,2}):(\d{2})/

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function clamp(number, minimum, maximum) {
  return Math.min(Math.max(number, minimum), maximum)
}

function isSamePrayerInstance(firstPrayer, secondPrayer) {
  return (
    firstPrayer.key === secondPrayer.key &&
    firstPrayer.type === secondPrayer.type &&
    firstPrayer.date.getTime() === secondPrayer.date.getTime()
  )
}

export function getCalculationMethodLabel(value) {
  return CALCULATION_METHODS.find((method) => method.value === value)?.label ?? 'Custom'
}

export function normalizePrayerTime(time) {
  const match = String(time ?? '').match(TIME_MATCHER)

  if (!match) {
    return ''
  }

  return `${match[1].padStart(2, '0')}:${match[2]}`
}

export function prayerDateFromTime(time, date = new Date()) {
  const normalizedTime = normalizePrayerTime(time)
  const [hours = '0', minutes = '0'] = normalizedTime.split(':')
  const prayerDate = new Date(date)

  prayerDate.setHours(Number(hours), Number(minutes), 0, 0)

  return prayerDate
}

export function formatPrayerTime(time, format = '12h') {
  const prayerDate = prayerDateFromTime(time)

  return new Intl.DateTimeFormat('en', {
    hour: format === '24h' ? '2-digit' : 'numeric',
    minute: '2-digit',
    hour12: format !== '24h',
  }).format(prayerDate)
}

export function formatDuration(milliseconds) {
  if (milliseconds <= 0) {
    return 'Now'
  }

  const totalSeconds = Math.ceil(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`
  }

  return `${seconds}s`
}

export function formatCoordinates(latitude, longitude) {
  return `${Number(latitude).toFixed(3)}, ${Number(longitude).toFixed(3)}`
}

export function formatReadableDate(date = new Date()) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function getPrayerTimeline(timings, now = new Date()) {
  const schedule = PRAYER_SEQUENCE.map((prayer) => {
    const normalizedTime = normalizePrayerTime(timings?.[prayer.key])

    return {
      ...prayer,
      time: normalizedTime,
      date: prayerDateFromTime(normalizedTime, now),
      status: 'upcoming',
    }
  }).filter((prayer) => prayer.time)

  const prayerOnlySchedule = schedule.filter((prayer) => prayer.type === 'prayer')
  const nextPrayerIndex = prayerOnlySchedule.findIndex((prayer) => prayer.date > now)
  const nextPrayer =
    nextPrayerIndex === -1
      ? { ...prayerOnlySchedule[0], date: addDays(prayerOnlySchedule[0].date, 1) }
      : prayerOnlySchedule[nextPrayerIndex]
  const currentPrayer =
    nextPrayerIndex === 0
      ? {
          ...prayerOnlySchedule[prayerOnlySchedule.length - 1],
          date: addDays(prayerOnlySchedule[prayerOnlySchedule.length - 1].date, -1),
        }
      : nextPrayerIndex === -1
        ? prayerOnlySchedule[prayerOnlySchedule.length - 1]
        : prayerOnlySchedule[nextPrayerIndex - 1]

  const totalWindow = nextPrayer.date.getTime() - currentPrayer.date.getTime()
  const elapsedWindow = now.getTime() - currentPrayer.date.getTime()
  const progress = totalWindow > 0 ? clamp((elapsedWindow / totalWindow) * 100, 0, 100) : 0

  const enhancedSchedule = schedule.map((prayer) => {
    if (isSamePrayerInstance(prayer, currentPrayer)) {
      return { ...prayer, status: 'current' }
    }

    if (isSamePrayerInstance(prayer, nextPrayer)) {
      return { ...prayer, status: 'next' }
    }

    if (prayer.date < now) {
      return { ...prayer, status: 'completed' }
    }

    return { ...prayer, status: 'upcoming' }
  })

  return {
    currentPrayer,
    nextPrayer,
    progress,
    remainingMs: nextPrayer.date.getTime() - now.getTime(),
    schedule: enhancedSchedule,
  }
}
