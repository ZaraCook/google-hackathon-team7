import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './common.css'

type PanelProps = {
  title?: string
  subtitle?: string
  actions?: ReactNode
  children?: ReactNode
  className?: string
}

function Panel({
  title,
  subtitle,
  actions,
  children,
  className = '',
}: PanelProps) {
  const classNames = ['ui-panel', className].filter(Boolean).join(' ')

  return (
    <motion.section
      className={classNames}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {(title || subtitle || actions) && (
        <header className="ui-panel__header">
          <div>
            {title ? <h3 className="ui-panel__title">{title}</h3> : null}
            {subtitle ? <p className="ui-panel__subtitle">{subtitle}</p> : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </header>
      )}

      {children ? <div className="ui-panel__body">{children}</div> : null}
    </motion.section>
  )
}

export default Panel
