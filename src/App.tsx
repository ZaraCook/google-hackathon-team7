import './App.css'

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Digital Twin Dashboard</h1>
      </header>

      <div className="app-body">
        <aside className="app-sidebar" aria-label="Primary navigation">
          <nav>
            <ul>
              <li>Overview</li>
              <li>Timeline</li>
              <li>Habits</li>
              <li>Health</li>
              <li>Goals</li>
            </ul>
          </nav>
        </aside>

        <main className="app-main" aria-label="Main content area">
          <section className="main-placeholder">
            <h2>Main Content Area</h2>
            <p>Feature modules will be added here over time.</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
