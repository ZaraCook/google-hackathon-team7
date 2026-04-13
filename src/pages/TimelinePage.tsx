import { Card, Panel } from '../components/common'

function TimelinePage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Timeline</h2>
        <p>Placeholder timeline page for future event and time-flow views.</p>
      </header>

      <Panel
        title="Timeline"
        subtitle="Flowing event layers, time windows, and scheduled items."
      >
        <Card
          title="Timeline lane"
          description="A reusable card for future hourly, daily, or weekly views."
        >
          <p>Build the flowing day timeline and event stream here.</p>
        </Card>
      </Panel>
    </section>
  )
}

export default TimelinePage
