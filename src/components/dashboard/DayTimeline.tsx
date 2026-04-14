import type { Session } from '../../types'
import './DayTimeline.css'

type DayTimelineProps = {
  sessions: Session[]
}

type SessionSegment = {
  id: string
  label: string
  type: Session['type']
  startMinutes: number
  endMinutes: number
}

function toMinutes(value: string) {
  const date = new Date(value)
  return date.getHours() * 60 + date.getMinutes()
}

function formatTick(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

function toSegments(sessions: Session[]) {
  return sessions
    .map<SessionSegment>((session) => {
      const start = toMinutes(session.startTime)
      const end = toMinutes(session.endTime)

      return {
        id: session.id,
        label: session.label,
        type: session.type,
        startMinutes: Math.min(start, end),
        endMinutes: Math.max(start, end),
      }
    })
    .sort((a, b) => a.startMinutes - b.startMinutes)
}

function getWindow(segments: SessionSegment[]) {
  if (segments.length === 0) {
    return { start: 8 * 60, end: 20 * 60 }
  }

  const minStart = Math.min(...segments.map((item) => item.startMinutes))
  const maxEnd = Math.max(...segments.map((item) => item.endMinutes))

  let start = Math.max(0, (Math.floor(minStart / 60) - 1) * 60)
  let end = Math.min(24 * 60, (Math.ceil(maxEnd / 60) + 1) * 60)

  if (end - start < 8 * 60) {
    const midpoint = Math.round((minStart + maxEnd) / 2)
    start = Math.max(0, midpoint - 4 * 60)
    end = Math.min(24 * 60, midpoint + 4 * 60)
  }

  return { start, end }
}

function DayTimeline({ sessions }: DayTimelineProps) {
  const segments = toSegments(sessions)
  const windowRange = getWindow(segments)
  const duration = Math.max(1, windowRange.end - windowRange.start)

  const ticks: number[] = []
  for (let minute = windowRange.start; minute <= windowRange.end; minute += 120) {
    ticks.push(minute)
  }

  if (ticks[ticks.length - 1] !== windowRange.end) {
    ticks.push(windowRange.end)
  }

  return (
    <div className="day-timeline" aria-label="Horizontal timeline of your day">
      <div className="day-timeline__track">
        {segments.map((segment) => {
          const left = ((segment.startMinutes - windowRange.start) / duration) * 100
          const width =
            ((segment.endMinutes - segment.startMinutes) / duration) * 100

          return (
            <div
              key={segment.id}
              className={`day-timeline__segment day-timeline__segment--${segment.type}`}
              style={{ left: `${left}%`, width: `${Math.max(width, 4)}%` }}
              title={`${segment.label} (${formatTick(segment.startMinutes)}-${formatTick(segment.endMinutes)})`}
            >
              <span>{segment.label}</span>
            </div>
          )
        })}
      </div>

      <div className="day-timeline__ticks" aria-hidden="true">
        {ticks.map((tick) => (
          <span key={tick}>{formatTick(tick)}</span>
        ))}
      </div>
    </div>
  )
}

export default DayTimeline
