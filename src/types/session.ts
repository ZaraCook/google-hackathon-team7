export type SessionType = 'focus' | 'break' | 'exercise' | 'sleep' | 'admin' | 'other'

export type Session = {
  id: string
  label: string
  type: SessionType
  startTime: string
  endTime: string
  timezone: string
  energyLevel?: number
  notes?: string
  source?: 'manual' | 'imported' | 'generated'
  createdAt: string
  updatedAt: string
}
