import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DEFAULT_LOCATION, DEFAULT_SETTINGS } from '../src/lib/prayer-times.js'
import { fetchPrayerTimes } from '../src/services/prayer-api.js'

const timings = {
  Fajr: '05:30', Sunrise: '06:45', Dhuhr: '12:15',
  Asr: '15:30', Maghrib: '18:15', Isha: '19:45',
}
const request = { location: DEFAULT_LOCATION, settings: DEFAULT_SETTINGS }

function response(data) {
  return { ok: true, json: async () => ({ code: 200, data }) }
}

test('sends the selected location and calculation settings', async t => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => response({ timings }))
  const result = await fetchPrayerTimes(request)
  const url = fetch.mock.calls[0].arguments[0]
  assert.equal(url.searchParams.get('latitude'), String(DEFAULT_LOCATION.latitude))
  assert.equal(url.searchParams.get('longitude'), String(DEFAULT_LOCATION.longitude))
  assert.equal(url.searchParams.get('method'), DEFAULT_SETTINGS.calculationMethod)
  assert.equal(url.searchParams.get('school'), DEFAULT_SETTINGS.asrSchool)
  assert.deepEqual(result.timings, timings)
})

test('rejects incomplete schedules instead of presenting partial prayer times', async t => {
  t.mock.method(globalThis, 'fetch', async () => response({ timings: { Fajr: '05:30' } }))
  await assert.rejects(fetchPrayerTimes(request), /missing or invalid times/)
})

test('rejects invalid prayer values even if the API reports success', async t => {
  t.mock.method(globalThis, 'fetch', async () => response({ timings: { ...timings, Asr: '25:00' } }))
  await assert.rejects(fetchPrayerTimes(request), /missing or invalid times/)
})

test('surfaces unsuccessful HTTP responses', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 503 }))
  await assert.rejects(fetchPrayerTimes(request), /503/)
})

test('cancels an in-flight fetch when the caller aborts', async t => {
  let fetchSignal
  t.mock.method(globalThis, 'fetch', (_url, { signal }) => {
    fetchSignal = signal
    return new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true })
    })
  })
  const controller = new AbortController()
  const pending = fetchPrayerTimes({ ...request, signal: controller.signal })
  controller.abort()
  await assert.rejects(pending, { name: 'AbortError' })
  assert.equal(fetchSignal.aborted, true)
})

test('passes an already-aborted signal to fetch', async t => {
  t.mock.method(globalThis, 'fetch', async (_url, { signal }) => {
    signal.throwIfAborted()
    return response({ timings })
  })
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(fetchPrayerTimes({ ...request, signal: controller.signal }), { name: 'AbortError' })
})
