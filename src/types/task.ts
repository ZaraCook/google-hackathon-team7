export type TaskStatus = 'backlog' | 'planned' | 'in-progress' | 'blocked' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  estimateMinutes?: number
  tags?: string[]
  createdAt: string
  updatedAt: string
}
