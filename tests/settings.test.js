import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DEFAULT_SETTINGS } from '../src/lib/prayer-times.js'
import { isValidSetting, normalizeSettings } from '../src/lib/settings.js'

test('restores defaults for non-object saved preferences', () => {
  for (const value of [null, undefined, 42, 'dark', ['dark']]) {
    assert.deepEqual(normalizeSettings(value), DEFAULT_SETTINGS)
  }
})

test('keeps supported preferences and discards unknown or invalid fields', () => {
  assert.deepEqual(normalizeSettings({
    theme: 'dark', timeFormat: '25h', calculationMethod: '1', asrSchool: 1, extra: true,
  }), { ...DEFAULT_SETTINGS, theme: 'dark', calculationMethod: '1' })
})

test('does not mutate defaults while normalizing settings', () => {
  const settings = normalizeSettings(null)
  settings.theme = 'dark'
  assert.equal(DEFAULT_SETTINGS.theme, 'system')
})

test('rejects unknown keys, inherited keys, and unsupported values', () => {
  assert.equal(isValidSetting('theme', 'light'), true)
  assert.equal(isValidSetting('theme', 'sepia'), false)
  assert.equal(isValidSetting('constructor', 'dark'), false)
  assert.equal(isValidSetting('unknown', 'dark'), false)
})
