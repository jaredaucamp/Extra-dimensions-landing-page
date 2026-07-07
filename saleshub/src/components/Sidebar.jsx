import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, Wallet, StickyNote, Users, X } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/calendar', label: 'Calendar', icon: Calendar },
  { to: '/earnings', label: 'Earnings', icon: Wallet },
  { to: '/notes', label: 'Notes', icon: StickyNote },
  { to: '/clients', label: 'Clients', icon: Users },
]

function NavItems({ onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-2 space-y-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-white/10 text-white'
                : 'text-[#a0a0a0] hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Icon size={18} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      <aside className="hidden md:flex md:flex-col md:w-56 md:shrink-0 bg-[#1a1a1a] min-h-screen sticky top-0">
        <div className="px-5 py-6">
          <span className="text-white font-semibold text-lg tracking-tight">SalesHub</span>
        </div>
        <NavItems />
        <div className="px-5 py-4 text-xs text-[#6b6b6b]">v0.1 &middot; mock data</div>
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-[#1a1a1a] h-full flex flex-col">
            <div className="px-5 py-6 flex items-center justify-between">
              <span className="text-white font-semibold text-lg tracking-tight">SalesHub</span>
              <button
                onClick={onCloseMobile}
                aria-label="Close menu"
                className="text-[#a0a0a0] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <NavItems onNavigate={onCloseMobile} />
          </div>
          <div className="flex-1 bg-black/40" onClick={onCloseMobile} />
        </div>
      )}
    </>
  )
}
