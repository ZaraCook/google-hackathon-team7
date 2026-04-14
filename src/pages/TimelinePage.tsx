import { useState } from 'react'
import type { DragEvent } from 'react'
import { Panel } from '../components/common'
import DayTimeline from '../components/dashboard/DayTimeline'
import { useLifeStore } from '../services/lifeStore'

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getDurationMinutes(startTime: string, endTime: string) {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  return Math.max(0, Math.round((end - start) / 60000))
}

function toIso(date: Date) {
  return date.toISOString()
}

function reorderAndReschedule(
  sessions: ReturnType<typeof useLifeStore.getState>['sessions'],
  draggedId: string,
  targetId: string,
) {
  if (draggedId === targetId) {
    return sessions
  }

  const ordered = sessions
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )

  const draggedIndex = ordered.findIndex((session) => session.id === draggedId)
  const targetIndex = ordered.findIndex((session) => session.id === targetId)

  if (draggedIndex < 0 || targetIndex < 0) {
    return sessions
  }

  const next = ordered.slice()
  const [moved] = next.splice(draggedIndex, 1)
  next.splice(targetIndex, 0, moved)

  const baseStart = new Date(
    Math.min(...ordered.map((session) => new Date(session.startTime).getTime())),
  )
  let cursor = baseStart.getTime()

  return next.map((session) => {
    const durationMs = Math.max(
      5 * 60 * 1000,
      new Date(session.endTime).getTime() - new Date(session.startTime).getTime(),
    )

    const startTime = new Date(cursor)
    const endTime = new Date(cursor + durationMs)
    cursor = endTime.getTime()

    return {
      ...session,
      startTime: toIso(startTime),
      endTime: toIso(endTime),
      updatedAt: toIso(new Date()),
    }
  })
}

function TimelinePage() {
  const rawSessions = useLifeStore((state) => state.sessions)
  const setSessions = useLifeStore((state) => state.setSessions)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  const sessions = rawSessions.toSorted(
    (a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  )

  const handleDragStart = (event: DragEvent<HTMLElement>, sessionId: string) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', sessionId)
    setDraggingId(sessionId)
  }

  const handleDrop = (event: DragEvent<HTMLElement>, targetId: string) => {
    event.preventDefault()

    const draggedId = event.dataTransfer.getData('text/plain') || draggingId
    if (!draggedId) {
      return
    }

    const updated = reorderAndReschedule(rawSessions, draggedId, targetId)
    setSessions(updated)
    setDraggingId(null)
    setDropTargetId(null)
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Timeline</h2>
        <p>Mock time blocks for focus, breaks, and admin sessions.</p>
      </header>

      <Panel
        title="Session Timeline"
        subtitle="Drag blocks to reorder your day. Timeline will reschedule in that order."
      >
        <DayTimeline sessions={sessions} />

        <div className="time-blocks-grid" aria-label="Time blocks">
          {sessions.map((session) => (
            <article
              key={session.id}
              className={`time-block${
                draggingId === session.id ? ' time-block--dragging' : ''
              }${dropTargetId === session.id ? ' time-block--drop-target' : ''}`}
              draggable
              onDragStart={(event) => handleDragStart(event, session.id)}
              onDragEnd={() => {
                setDraggingId(null)
                setDropTargetId(null)
              }}
              onDragOver={(event) => {
                event.preventDefault()
                setDropTargetId(session.id)
              }}
              onDragEnter={() => setDropTargetId(session.id)}
              onDragLeave={() => {
                if (dropTargetId === session.id) {
                  setDropTargetId(null)
                }
              }}
              onDrop={(event) => handleDrop(event, session.id)}
            >
              <div className="time-block__head">
                <h3>{session.label}</h3>
                <span className={`time-block__badge time-block__badge--${session.type}`}>
                  {session.type}
                </span>
              </div>
              <p className="time-block__range">
                {formatTime(session.startTime)} - {formatTime(session.endTime)}
              </p>
              <p className="time-block__meta">
                {getDurationMinutes(session.startTime, session.endTime)} min · {session.timezone}
                {session.energyLevel ? ` · energy ${session.energyLevel}/10` : ''}
              </p>
            </article>
          ))}
        </div>
      </Panel>
    </section>
  )
}

export default TimelinePage
