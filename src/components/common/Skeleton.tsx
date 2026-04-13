import type { CSSProperties } from 'react'
import './common.css'

type SkeletonProps = {
  variant?: 'text' | 'block' | 'circle'
  width?: string | number
  height?: string | number
  className?: string
  style?: CSSProperties
}

function Skeleton({
  variant = 'block',
  width,
  height,
  className = '',
  style,
}: SkeletonProps) {
  const classNames = ['ui-skeleton', `ui-skeleton--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classNames}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  )
}

export default Skeleton
