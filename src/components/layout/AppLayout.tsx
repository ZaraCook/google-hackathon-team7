import { NavLink, Outlet } from 'react-router-dom'
import './AppLayout.css'

const navItems = [
  { label: 'Overview', to: '/' },
  { label: 'Timeline', to: '/timeline' },
  { label: 'Habits', to: '/habits' },
  { label: 'Health', to: '/health' },
  { label: 'Goals', to: '/goals' },
]

function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <p className="app-kicker">Digital Twin Dashboard</p>
          <h1>Digital Twin Dashboard</h1>
        </div>
      </header>

      <div className="app-body">
        <aside className="app-sidebar" aria-label="Primary navigation">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive ? 'sidebar-link active' : 'sidebar-link'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="app-main" aria-label="Main content area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
