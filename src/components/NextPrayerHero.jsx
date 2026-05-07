import { Clock3, MapPin } from 'lucide-react'
import { formatDuration, formatPrayerTime } from '@/lib/prayer-times.js'

function NextPrayerHero({
  currentPrayer,
  date,
  location,
  nextPrayer,
  progress,
  remainingMs,
  timeFormat,
}) {
  return (
    <section className="hero-card" aria-labelledby="next-prayer-title">
      <div className="hero-topline">
        <span className="section-eyebrow">Next prayer</span>
        <span className="source-chip">{date?.hijri || 'Hijri date loading'}</span>
      </div>

      <div className="hero-main">
        <div>
          <h2 id="next-prayer-title" className="hero-prayer-name">
            {nextPrayer.label}
          </h2>
          <p className="hero-prayer-description">{nextPrayer.description}</p>
        </div>

        <div className="hero-time-block" aria-live="polite">
          <span className="hero-countdown">{formatDuration(remainingMs)}</span>
          <span className="hero-time">
            <Clock3 size={18} aria-hidden="true" />
            {formatPrayerTime(nextPrayer.time, timeFormat)}
          </span>
        </div>
      </div>

      <div className="hero-progress" aria-label="Progress toward the next prayer">
        <div className="progress-copy">
          <span>Current: {currentPrayer.label}</span>
          <span>Upcoming: {nextPrayer.label}</span>
        </div>
        <div className="progress-track">
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="hero-footer">
        <span className="hero-location">
          <MapPin size={17} aria-hidden="true" />
          {location.label}
        </span>
        <span>{date?.gregorian}</span>
      </div>
    </section>
  )
}

export default NextPrayerHero
