import { create } from 'zustand'
import type { Habit, Session, Task } from '../types'
import { mockDataset } from '../utils/mockData'

type CreateTaskInput = Pick<
  Task,
  'title' | 'status' | 'priority' | 'description' | 'estimateMinutes' | 'tags'
>

type UpdateTaskInput = Partial<CreateTaskInput>

function createTaskId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

type LifeState = {
  tasks: Task[]
  habits: Habit[]
  sessions: Session[]
  isLoading: boolean
  setTasks: (tasks: Task[]) => void
  setHabits: (habits: Habit[]) => void
  setSessions: (sessions: Session[]) => void
  setLoading: (isLoading: boolean) => void
  addTask: (task: CreateTaskInput) => void
  editTask: (id: string, updates: UpdateTaskInput) => void
  deleteTask: (id: string) => void
  resetMockData: () => void
}

export const useLifeStore = create<LifeState>((set) => ({
  tasks: mockDataset.tasks,
  habits: mockDataset.habits,
  sessions: mockDataset.sessions,
  isLoading: false,
  setTasks: (tasks) => set({ tasks }),
  setHabits: (habits) => set({ habits }),
  setSessions: (sessions) => set({ sessions }),
  setLoading: (isLoading) => set({ isLoading }),
  addTask: (task) => {
    const now = new Date().toISOString()
    set((state) => ({
      tasks: [
        {
          id: createTaskId(),
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          estimateMinutes: task.estimateMinutes,
          tags: task.tags,
          createdAt: now,
          updatedAt: now,
        },
        ...state.tasks,
      ],
    }))
  },
  editTask: (id, updates) => {
    const now = new Date().toISOString()
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: now,
            }
          : task,
      ),
    }))
  },
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  resetMockData: () =>
    set({
      tasks: mockDataset.tasks,
      habits: mockDataset.habits,
      sessions: mockDataset.sessions,
    }),
}))
