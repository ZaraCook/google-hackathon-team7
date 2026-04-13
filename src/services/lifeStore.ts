import { create } from 'zustand'
import type { Habit, Session, Task } from '../types'
import { mockDataset } from '../utils/mockData'

type LifeState = {
  tasks: Task[]
  habits: Habit[]
  sessions: Session[]
  isLoading: boolean
  setTasks: (tasks: Task[]) => void
  setHabits: (habits: Habit[]) => void
  setSessions: (sessions: Session[]) => void
  setLoading: (isLoading: boolean) => void
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
  resetMockData: () =>
    set({
      tasks: mockDataset.tasks,
      habits: mockDataset.habits,
      sessions: mockDataset.sessions,
    }),
}))
