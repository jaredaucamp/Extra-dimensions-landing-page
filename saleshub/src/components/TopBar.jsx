import { Menu } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { formatDate } from '../lib/format'

export default function TopBar({ onOpenMobileNav }) {
  const { today } = useData()

  return (
    <header className="sticky top-0 z-30 bg-[#f5f5f3]/90 backdrop-blur-sm border-b border-[#e5e5e3]">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            aria-label="Open menu"
            className="md:hidden text-gray-500 hover:text-gray-800"
          >
            <Menu size={22} />
          </button>
          <span className="font-semibold text-[#1a1a1a] md:hidden">SalesHub</span>
        </div>
        <p className="text-sm text-gray-500">{formatDate(today, { withWeekday: true })}</p>
      </div>
    </header>
  )
}
