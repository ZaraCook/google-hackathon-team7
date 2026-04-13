import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import {
  GoalsPage,
  HabitsPage,
  HealthPage,
  NotFoundPage,
  OverviewPage,
  TimelinePage,
} from './pages'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="habits" element={<HabitsPage />} />
        <Route path="health" element={<HealthPage />} />
        <Route path="goals" element={<GoalsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
