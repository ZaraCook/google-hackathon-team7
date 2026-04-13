import { Card, Panel } from '../components/common'
import { mockDataset } from '../utils/mockData'

function DashboardPage() {
  const { tasks, habits, sessions } = mockDataset
  const openTasks = tasks.filter((task) => task.status !== 'done').length

  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>Live mock overview using tasks, habits, and time-block sessions.</p>
      </header>

      <Panel title="Quick Stats" subtitle="Snapshot of current life-system state.">
        <div className="data-grid">
          <Card title="Open Tasks" description="Not done yet">
            <p className="metric-value">{openTasks}</p>
          </Card>
          <Card title="Active Habits" description="Currently enabled trackers">
            <p className="metric-value">{habits.filter((habit) => habit.active).length}</p>
          </Card>
          <Card title="Sessions Today" description="Tracked time blocks">
            <p className="metric-value">{sessions.length}</p>
          </Card>
        </div>
      </Panel>

      <Panel title="Recent Tasks" subtitle="Mock task feed.">
        <div className="stack-list">
          {tasks.slice(0, 4).map((task) => (
            <Card
              key={task.id}
              title={task.title}
              description={`${task.status} · ${task.priority}`}
            >
              <p>{task.description ?? 'No description yet.'}</p>
            </Card>
          ))}
        </div>
      </Panel>
    </section>
  )
}

export default DashboardPage
