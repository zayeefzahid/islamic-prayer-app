import { Clock, LocateFixed, Moon, RefreshCcw, SlidersHorizontal, Sun } from 'lucide-react'
import { ASR_SCHOOLS, CALCULATION_METHODS } from '@/lib/prayer-times.js'

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

function SettingsPanel({
  isBusy,
  isOpen,
  location,
  onUpdateSetting,
  onUseDeviceLocation,
  settings,
}) {
  const selectedMethod = CALCULATION_METHODS.find(
    (method) => method.value === settings.calculationMethod
  )
  const selectedAsrSchool = ASR_SCHOOLS.find((school) => school.value === settings.asrSchool)

  return (
    <section
      id="settings-panel"
      className={`surface-panel settings-panel ${isOpen ? 'is-open' : ''}`}
      aria-labelledby="settings-title"
    >
      <div className="panel-header">
        <div>
          <span className="section-eyebrow">Preferences</span>
          <h2 id="settings-title">Settings</h2>
        </div>
        <SlidersHorizontal size={20} aria-hidden="true" />
      </div>

      <div className="settings-stack">
        <div className="setting-group">
          <label htmlFor="calculation-method">Calculation convention</label>
          <select
            id="calculation-method"
            className="native-select"
            value={settings.calculationMethod}
            onChange={(event) => onUpdateSetting('calculationMethod', event.target.value)}
          >
            {CALCULATION_METHODS.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
          <p>{selectedMethod?.helper}</p>
        </div>

        <div className="setting-group">
          <span className="setting-label">Asr calculation</span>
          <div className="segmented-control" role="group" aria-label="Asr calculation">
            {ASR_SCHOOLS.map((school) => (
              <button
                key={school.value}
                className={settings.asrSchool === school.value ? 'is-selected' : ''}
                onClick={() => onUpdateSetting('asrSchool', school.value)}
                type="button"
              >
                {school.label}
              </button>
            ))}
          </div>
          <p>{selectedAsrSchool?.helper}</p>
        </div>

        <div className="setting-group">
          <span className="setting-label">Clock format</span>
          <div className="segmented-control" role="group" aria-label="Clock format">
            <button
              className={settings.timeFormat === '12h' ? 'is-selected' : ''}
              onClick={() => onUpdateSetting('timeFormat', '12h')}
              type="button"
            >
              12 hour
            </button>
            <button
              className={settings.timeFormat === '24h' ? 'is-selected' : ''}
              onClick={() => onUpdateSetting('timeFormat', '24h')}
              type="button"
            >
              24 hour
            </button>
          </div>
        </div>

        <div className="setting-group">
          <span className="setting-label">Theme</span>
          <div className="theme-control" role="group" aria-label="Theme">
            {themeOptions.map((option) => {
              const Icon = option.value === 'dark' ? Moon : option.value === 'light' ? Sun : Clock

              return (
                <button
                  key={option.value}
                  className={settings.theme === option.value ? 'is-selected' : ''}
                  onClick={() => onUpdateSetting('theme', option.value)}
                  type="button"
                >
                  <Icon size={16} aria-hidden="true" />
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="location-setting">
          <div>
            <span className="setting-label">Location</span>
            <p>{location.label}</p>
          </div>
          <button
            className="secondary-button"
            disabled={isBusy}
            onClick={onUseDeviceLocation}
            type="button"
          >
            {isBusy ? <RefreshCcw className="is-spinning" size={16} /> : <LocateFixed size={16} />}
            Use current
          </button>
        </div>
      </div>
    </section>
  )
}

export default SettingsPanel
