import { Panel } from '../components/common'
import DayTimeline from '../components/dashboard/DayTimeline'
import { useLifeStore } from '../services/lifeStore'

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getDurationMinutes(startTime: string, endTime: string) {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  return Math.max(0, Math.round((end - start) / 60000))
}

function TimelinePage() {
  const sessions = useLifeStore((state) => state.sessions).toSorted(
    (a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  )

  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Timeline</h2>
        <p>Mock time blocks for focus, breaks, and admin sessions.</p>
      </header>

      <Panel
        title="Session Timeline"
        subtitle="Ordered list of current day sessions from store data."
      >
        <DayTimeline sessions={sessions} />

        <div className="time-blocks-grid" aria-label="Time blocks">
          {sessions.map((session) => (
            <article key={session.id} className="time-block">
              <div className="time-block__head">
                <h3>{session.label}</h3>
                <span className={`time-block__badge time-block__badge--${session.type}`}>
                  {session.type}
                </span>
              </div>
              <p className="time-block__range">
                {formatTime(session.startTime)} - {formatTime(session.endTime)}
              </p>
              <p className="time-block__meta">
                {getDurationMinutes(session.startTime, session.endTime)} min · {session.timezone}
                {session.energyLevel ? ` · energy ${session.energyLevel}/10` : ''}
              </p>
            </article>
          ))}
        </div>
      </Panel>
    </section>
  )
}

export default TimelinePage
