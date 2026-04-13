import { Card, Panel } from '../components/common'
import { mockSessions } from '../utils/mockData'

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function TimelinePage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Timeline</h2>
        <p>Mock time blocks for focus, breaks, and admin sessions.</p>
      </header>

      <Panel
        title="Session Timeline"
        subtitle="Ordered list of current day sessions from mock data."
      >
        <div className="stack-list">
          {mockSessions.map((session) => (
            <Card
              key={session.id}
              title={session.label}
              description={`${session.type} · energy ${session.energyLevel ?? '-'} / 10`}
            >
              <p>
                {formatTime(session.startTime)} - {formatTime(session.endTime)} ({session.timezone})
              </p>
            </Card>
          ))}
        </div>
      </Panel>
    </section>
  )
}

export default TimelinePage
