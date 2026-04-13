function NotFoundPage() {
  return (
    <section className="page-shell">
      <header className="page-header">
        <h2>Page not found</h2>
        <p>The route you requested does not exist.</p>
      </header>
      <div className="page-card">
        <h3>404</h3>
        <p>Use the sidebar to navigate back to a valid section.</p>
      </div>
    </section>
  )
}

export default NotFoundPage
