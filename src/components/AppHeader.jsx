import { CalendarDays, LocateFixed, RefreshCcw, Settings2 } from 'lucide-react'

function AppHeader({
  date,
  isRefreshing,
  location,
  onRefresh,
  onToggleSettings,
  settingsOpen,
}) {
  return (
    <header className="app-header">
      <div className="brand-group">
        <div className="brand-mark" aria-hidden="true">
          <LocateFixed size={22} strokeWidth={1.8} />
        </div>
        <div>
          <p className="brand-kicker">Daily salah companion</p>
          <h1>Prayer Times</h1>
        </div>
      </div>

      <div className="header-meta" aria-label="Date and location">
        <div className="meta-line">
          <LocateFixed size={16} aria-hidden="true" />
          <span>{location.label}</span>
        </div>
        <div className="meta-line">
          <CalendarDays size={16} aria-hidden="true" />
          <span>{date?.gregorian || 'Preparing today\'s schedule'}</span>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="icon-button"
          disabled={isRefreshing}
          onClick={onRefresh}
          type="button"
          aria-label="Refresh prayer times"
        >
          <RefreshCcw className={isRefreshing ? 'is-spinning' : ''} size={18} />
        </button>
        <button
          className="icon-button settings-trigger"
          onClick={onToggleSettings}
          type="button"
          aria-expanded={settingsOpen}
          aria-controls="settings-panel"
          aria-label="Open settings"
        >
          <Settings2 size={18} />
        </button>
      </div>
    </header>
  )
}

export default AppHeader
