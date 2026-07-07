import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import CalendarPage from './pages/CalendarPage'
import Earnings from './pages/Earnings'
import Notes from './pages/Notes'
import Clients from './pages/Clients'

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f5f5f3]">
      <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
      <div className="flex-1 min-w-0">
        <TopBar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="px-4 md:px-8 py-6 max-w-6xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
