import { AlertTriangle, Loader2, RefreshCcw } from 'lucide-react'

export function NoticeBanner({ message, tone = 'info' }) {
  return (
    <div className={`notice-banner notice-${tone}`} role={tone === 'warning' ? 'alert' : 'status'}>
      <span>{message}</span>
    </div>
  )
}

export function LoadingState() {
  return (
    <section className="loading-layout" aria-label="Loading prayer times">
      <div className="hero-card loading-hero">
        <div className="skeleton skeleton-short" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-countdown" />
        <div className="skeleton skeleton-line" />
      </div>

      <div className="surface-panel schedule-panel">
        <div className="panel-header">
          <div>
            <div className="skeleton skeleton-short" />
            <div className="skeleton skeleton-heading" />
          </div>
          <Loader2 className="is-spinning muted-icon" size={20} />
        </div>

        <div className="loading-rows">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="loading-row" key={index}>
              <div className="skeleton skeleton-dot" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-time" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ErrorState({ onRetry }) {
  return (
    <section className="surface-panel error-state" role="alert" aria-labelledby="error-title">
      <AlertTriangle size={28} aria-hidden="true" />
      <div>
        <h2 id="error-title">Prayer times are unavailable</h2>
        <p>Check your connection and try loading the schedule again.</p>
      </div>
      <button className="secondary-button" onClick={onRetry} type="button">
        <RefreshCcw size={16} />
        Try again
      </button>
    </section>
  )
}
