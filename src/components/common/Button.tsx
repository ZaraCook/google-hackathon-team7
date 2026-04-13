import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './common.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  )
}

export default Button
