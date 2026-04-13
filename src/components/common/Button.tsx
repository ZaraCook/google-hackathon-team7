import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import './common.css'

type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const classNames = ['ui-button', `ui-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.button
      type={type}
      className={classNames}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
