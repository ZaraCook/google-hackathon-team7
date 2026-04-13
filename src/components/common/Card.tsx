import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './common.css'

type CardProps = {
  title?: string
  description?: string
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

function Card({
  title,
  description,
  footer,
  children,
  className = '',
}: CardProps) {
  const classNames = ['ui-card', className].filter(Boolean).join(' ')

  return (
    <motion.article
      className={classNames}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {(title || description) && (
        <header className="ui-card__header">
          <div>
            {title ? <h3 className="ui-card__title">{title}</h3> : null}
            {description ? (
              <p className="ui-card__description">{description}</p>
            ) : null}
          </div>
        </header>
      )}

      {children ? <div className="ui-card__body">{children}</div> : null}

      {footer ? <footer className="ui-card__footer">{footer}</footer> : null}
    </motion.article>
  )
}

export default Card
