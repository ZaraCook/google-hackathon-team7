import { Card, Panel } from '../components/common'
import { mockHabits, mockTasks } from '../utils/mockData'

function AnalyticsPage() {
  const doneTasks = mockTasks.filter((task) => task.status === 'done').length
  const completionRate = Math.round((doneTasks / mockTasks.length) * 100)
  const averageStreak = Math.round(
    mockHabits.reduce((sum, habit) => sum + habit.streak, 0) / mockHabits.length,
  )

  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Analytics</h2>
        <p>Derived metrics from the mock dataset for faster prototyping.</p>
      </header>

      <Panel title="Key Metrics" subtitle="Simple computed values from current mock data.">
        <div className="data-grid">
          <Card title="Task Completion" description="Done vs total tasks">
            <p className="metric-value">{completionRate}%</p>
          </Card>
          <Card title="Average Habit Streak" description="Across active habits">
            <p className="metric-value">{averageStreak} days</p>
          </Card>
          <Card title="Highest Streak" description="Best single habit streak">
            <p className="metric-value">{Math.max(...mockHabits.map((habit) => habit.bestStreak))} days</p>
          </Card>
        </div>
      </Panel>

      <Panel title="Habit Details" subtitle="Mock baseline for upcoming charts.">
        <div className="stack-list">
          {mockHabits.map((habit) => (
            <Card
              key={habit.id}
              title={habit.name}
              description={`${habit.cadence} · target ${habit.targetCount}`}
            >
              <p>
                Current streak: {habit.streak} days · Best streak: {habit.bestStreak} days
              </p>
            </Card>
          ))}
        </div>
      </Panel>
    </section>
  )
}

export default AnalyticsPage
