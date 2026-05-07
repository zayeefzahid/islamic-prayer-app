import { Check, Clock3, Moon, Sparkles, Sun, Sunrise, Sunset } from 'lucide-react'
import { formatPrayerTime } from '@/lib/prayer-times.js'

const prayerIcons = {
  Fajr: Sunrise,
  Sunrise,
  Dhuhr: Sun,
  Asr: Sparkles,
  Maghrib: Sunset,
  Isha: Moon,
}

const statusLabels = {
  completed: 'Done',
  current: 'Current',
  next: 'Next',
  upcoming: 'Later',
}

function PrayerSchedule({ calculationLabel, prayers, timeFormat }) {
  return (
    <section className="surface-panel schedule-panel" aria-labelledby="schedule-title">
      <div className="panel-header">
        <div>
          <span className="section-eyebrow">Today</span>
          <h2 id="schedule-title">Prayer schedule</h2>
        </div>
        <p>{calculationLabel}</p>
      </div>

      <ol className="prayer-list">
        {prayers.map((prayer) => {
          const PrayerIcon = prayerIcons[prayer.key] || Clock3
          const isCompleted = prayer.status === 'completed'

          return (
            <li className={`prayer-row is-${prayer.status}`} key={prayer.key}>
              <div className="prayer-icon" aria-hidden="true">
                {isCompleted ? <Check size={20} /> : <PrayerIcon size={20} />}
              </div>

              <div className="prayer-copy">
                <span className="prayer-name">{prayer.label}</span>
                <span className="prayer-description">{prayer.description}</span>
              </div>

              <div className="prayer-time-block">
                <time className="prayer-time" dateTime={prayer.time}>
                  {formatPrayerTime(prayer.time, timeFormat)}
                </time>
                <span className={`status-pill status-${prayer.status}`}>
                  {statusLabels[prayer.status]}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default PrayerSchedule
