import { motion } from 'framer-motion'
import { NavLink, Outlet } from 'react-router-dom'
import './AppLayout.css'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Timeline', to: '/timeline' },
  { label: 'Analytics', to: '/analytics' },
]

function AppLayout() {
  return (
    <motion.div
      className="app-layout"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <motion.header
        className="app-header"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div>
          <p className="app-kicker">Digital Twin Dashboard</p>
          <h1>Digital Twin Dashboard</h1>
        </div>
      </motion.header>

      <div className="app-body">
        <motion.aside
          className="app-sidebar"
          aria-label="Primary navigation"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
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
        </motion.aside>

        <motion.main
          className="app-main"
          aria-label="Main content area"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </motion.div>
  )
}

export default AppLayout
