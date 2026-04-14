import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Card, Panel } from '../components/common'
import { useLifeStore } from '../services/lifeStore'
import type { TaskPriority, TaskStatus } from '../types'

const statusOptions: TaskStatus[] = [
  'backlog',
  'planned',
  'in-progress',
  'blocked',
  'done',
]

const priorityOptions: TaskPriority[] = ['low', 'medium', 'high', 'critical']

function DashboardPage() {
  const tasks = useLifeStore((state) => state.tasks)
  const habits = useLifeStore((state) => state.habits)
  const sessions = useLifeStore((state) => state.sessions)
  const addTask = useLifeStore((state) => state.addTask)
  const editTask = useLifeStore((state) => state.editTask)
  const deleteTask = useLifeStore((state) => state.deleteTask)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('planned')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [estimateMinutes, setEstimateMinutes] = useState(30)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const isEditing = useMemo(() => editingTaskId !== null, [editingTaskId])
  const openTasks = tasks.filter((task) => task.status !== 'done').length

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setStatus('planned')
    setPriority('medium')
    setEstimateMinutes(30)
    setEditingTaskId(null)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanTitle = title.trim()
    if (!cleanTitle) {
      return
    }

    const payload = {
      title: cleanTitle,
      description: description.trim() || undefined,
      status,
      priority,
      estimateMinutes,
    }

    if (editingTaskId) {
      editTask(editingTaskId, payload)
    } else {
      addTask(payload)
    }

    resetForm()
  }

  const onEdit = (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) {
      return
    }

    setEditingTaskId(task.id)
    setTitle(task.title)
    setDescription(task.description ?? '')
    setStatus(task.status)
    setPriority(task.priority)
    setEstimateMinutes(task.estimateMinutes ?? 30)
  }

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

      <Panel
        title={isEditing ? 'Edit Task' : 'Add Task'}
        subtitle="Create, update, and manage task entries."
      >
        <form className="task-form" onSubmit={onSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: Build focus heatmap"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional notes..."
              rows={2}
            />
          </label>

          <div className="task-form-row">
            <label>
              Status
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as TaskStatus)}
              >
                {statusOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Priority
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as TaskPriority)}
              >
                {priorityOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Estimate (min)
              <input
                type="number"
                min={5}
                step={5}
                value={estimateMinutes}
                onChange={(event) => setEstimateMinutes(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="task-form-actions">
            <Button type="submit">{isEditing ? 'Save Changes' : 'Add Task'}</Button>
            {isEditing ? (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel Edit
              </Button>
            ) : null}
          </div>
        </form>
      </Panel>

      <Panel title="Tasks" subtitle="Edit or remove existing tasks.">
        <div className="stack-list">
          {tasks.map((task) => (
            <Card
              key={task.id}
              title={task.title}
              description={`${task.status} · ${task.priority}`}
              footer={
                <div className="task-card-actions">
                  <Button variant="secondary" onClick={() => onEdit(task.id)}>
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              }
            >
              <p>{task.description ?? 'No description yet.'}</p>
              <p className="task-meta">
                Estimate: {task.estimateMinutes ?? '-'} min · Updated:{' '}
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      </Panel>
    </section>
  )
}

export default DashboardPage
