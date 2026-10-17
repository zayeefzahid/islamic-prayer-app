import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  formatDuration,
  formatPrayerTime,
  getPrayerTimeline,
  normalizePrayerTime,
  prayerDateFromTime,
} from '../src/lib/prayer-times.js'

const timings = {
  Fajr: '05:30', Sunrise: '06:45', Dhuhr: '12:15',
  Asr: '15:30', Maghrib: '18:15', Isha: '19:45',
}

// Construct local dates so the suite does not depend on the machine's timezone.
const at = (hour, minute = 0) => new Date(2026, 9, 17, hour, minute)

test('accepts API timezone suffixes and rejects out-of-range times', () => {
  assert.equal(normalizePrayerTime('5:30 (EDT)'), '05:30')
  for (const value of [null, undefined, '', 'unavailable', '24:00', '12:60', '123:30', 'time 12:30']) {
    assert.equal(normalizePrayerTime(value), '')
  }
  assert.ok(Number.isNaN(prayerDateFromTime('invalid').getTime()))
  assert.equal(formatPrayerTime('invalid'), '—')
})

test('returns no timeline when the response contains no valid prayers', () => {
  assert.equal(getPrayerTimeline({}, at(12)), null)
  assert.equal(getPrayerTimeline({ Sunrise: '06:45' }, at(12)), null)
})

test('before Fajr, uses the previous evening as the current prayer', () => {
  const result = getPrayerTimeline(timings, at(4))
  assert.equal(result.currentPrayer.key, 'Isha')
  assert.equal(result.currentPrayer.date.getDate(), 16)
  assert.equal(result.nextPrayer.key, 'Fajr')
  assert.equal(result.remainingMs, 90 * 60 * 1000)
  assert.equal(result.schedule[0].status, 'next')
})

test('at the exact prayer time, advances to the following prayer', () => {
  const result = getPrayerTimeline(timings, at(12, 15))
  assert.equal(result.currentPrayer.key, 'Dhuhr')
  assert.equal(result.nextPrayer.key, 'Asr')
  assert.equal(result.progress, 0)
  assert.equal(result.schedule.find(p => p.key === 'Dhuhr').status, 'current')
})

test('sunrise stays in the schedule but is not the next obligatory prayer', () => {
  const result = getPrayerTimeline(timings, at(6))
  assert.equal(result.currentPrayer.key, 'Fajr')
  assert.equal(result.nextPrayer.key, 'Dhuhr')
  assert.ok(result.schedule.some(p => p.key === 'Sunrise'))
})

test('after Isha, rolls Fajr over to the following day', () => {
  const result = getPrayerTimeline(timings, at(23))
  assert.equal(result.nextPrayer.key, 'Fajr')
  assert.equal(result.nextPrayer.date.getDate(), 18)
  assert.equal(result.currentPrayer.key, 'Isha')
  assert.ok(result.progress >= 0 && result.progress <= 100)
  assert.equal(result.remainingMs, result.nextPrayer.date - at(23))
})

test('countdown rounds up without showing negative time', () => {
  assert.equal(formatDuration(-1), 'Now')
  assert.equal(formatDuration(1), '1s')
  assert.equal(formatDuration(60001), '1m 01s')
  assert.equal(formatDuration(3600000), '1h 00m')
})
