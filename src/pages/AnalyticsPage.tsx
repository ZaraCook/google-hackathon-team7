import { Button, Card, Panel } from '../components/common'

function AnalyticsPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Analytics</h2>
        <p>Placeholder analytics page for trends, projections, and insights.</p>
      </header>

      <Panel
        title="Analytics"
        subtitle="A home for charts, projections, and decision support tools."
        actions={<Button variant="ghost">Export</Button>}
      >
        <Card
          title="Insights card"
          description="Reusable card for forecasts, trends, and model outputs."
        >
          <p>Build charts, signals, and predictive views here.</p>
        </Card>
      </Panel>
    </section>
  )
}

export default AnalyticsPage
