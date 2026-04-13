import { Button, Card, Panel } from '../components/common'

function DashboardPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>Reusable component playground for the main product surface.</p>
      </header>

      <Panel
        title="Dashboard workspace"
        subtitle="Use this area for summary cards, controls, and live signals."
        actions={<Button variant="secondary">Add block</Button>}
      >
        <Card
          title="Overview card"
          description="A compact surface for metrics, labels, and future data widgets."
          footer={<Button>Primary action</Button>}
        >
          <p>Drop in charts, counters, or status blocks here.</p>
        </Card>
      </Panel>
    </section>
  )
}

export default DashboardPage
