import { useState } from 'react'
import type { DragEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Panel } from '../components/common'
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

const blockListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const blockItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24 },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.985,
    transition: { duration: 0.16 },
  },
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
  const [zoomLevel, setZoomLevel] = useState<'hours' | 'minutes'>('hours')

  const sessions = rawSessions.toSorted(
    (a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  )

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
        subtitle="Drag blocks to reorder your day. Use zoom to move between hour and minute views."
        actions={
          <div className="timeline-zoom-controls" role="group" aria-label="Timeline zoom level">
            <Button
              variant={zoomLevel === 'hours' ? 'primary' : 'secondary'}
              onClick={() => setZoomLevel('hours')}
            >
              Hours
            </Button>
            <Button
              variant={zoomLevel === 'minutes' ? 'primary' : 'secondary'}
              onClick={() => setZoomLevel('minutes')}
            >
              Minutes
            </Button>
          </div>
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={zoomLevel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <DayTimeline sessions={sessions} zoomLevel={zoomLevel} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="time-blocks-grid"
          aria-label="Time blocks"
          layout
          variants={blockListVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {sessions.map((session) => (
              <motion.article
                key={session.id}
                layout
                layoutId={session.id}
                className={`time-block${
                  draggingId === session.id ? ' time-block--dragging' : ''
                }${dropTargetId === session.id ? ' time-block--drop-target' : ''}`}
                variants={blockItemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                whileHover={{ y: -2 }}
                draggable
                onDragStart={() => setDraggingId(session.id)}
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
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Panel>
    </section>
  )
}

export default TimelinePage
