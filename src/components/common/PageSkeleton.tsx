import Skeleton from './Skeleton'
import './common.css'

type PageSkeletonProps = {
  title: string
  description: string
}

function PageSkeleton({ title, description }: PageSkeletonProps) {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>

      <div className="ui-page-skeleton">
        <div className="ui-page-skeleton__hero">
          <Skeleton variant="text" width="40%" height="1.1rem" />
          <Skeleton variant="text" width="70%" height="0.9rem" />
          <Skeleton variant="text" width="55%" height="0.9rem" />
        </div>

        <div className="ui-page-skeleton__grid">
          <article className="ui-page-skeleton__panel">
            <Skeleton variant="text" width="30%" height="1rem" />
            <Skeleton variant="block" height="8rem" />
          </article>
          <article className="ui-page-skeleton__panel">
            <Skeleton variant="text" width="45%" height="1rem" />
            <Skeleton variant="block" height="8rem" />
          </article>
        </div>
      </div>
    </section>
  )
}

export default PageSkeleton
