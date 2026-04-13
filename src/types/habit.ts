export type HabitCadence = 'daily' | 'weekly' | 'monthly'

export type Habit = {
  id: string
  name: string
  description?: string
  cadence: HabitCadence
  targetCount: number
  streak: number
  bestStreak: number
  lastCompletedAt?: string
  active: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}
