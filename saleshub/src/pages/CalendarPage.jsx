import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { formatDate, parseDate, toDateStr } from '../lib/format'
import { MEETING_TYPES } from '../lib/constants'
import Card from '../components/Card'
import MeetingRow from '../components/MeetingRow'
import ColourDot from '../components/ColourDot'
import QuickAddModal from '../components/QuickAddModal'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function buildGrid(year, month) {
  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7 // 0 = Monday
  const gridStart = new Date(year, month, 1 - startOffset)
  const days = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    days.push(d)
  }
  return days
}

export default function CalendarPage() {
  const { today, meetings } = useData()
  const todayDate = parseDate(today)
  const [viewDate, setViewDate] = useState(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(today)
  const [quickAddOpen, setQuickAddOpen] = useState(false)

  const meetingsByDate = useMemo(() => {
    const map = {}
    for (const m of meetings) {
      if (!map[m.date]) map[m.date] = []
      map[m.date].push(m)
    }
    return map
  }, [meetings])

  const days = useMemo(
    () => buildGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  )

  const changeMonth = (delta) => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1))
  }

  const goToToday = () => {
    setViewDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1))
    setSelectedDate(today)
  }

  const isViewingCurrentMonth =
    viewDate.getFullYear() === todayDate.getFullYear() && viewDate.getMonth() === todayDate.getMonth()

  const selectedMeetings = (meetingsByDate[selectedDate] || [])
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#1a1a1a]">Calendar</h1>
        <div className="flex items-center gap-3">
          {!isViewingCurrentMonth && (
            <button
              onClick={goToToday}
              className="text-xs font-medium text-[#378ADD] hover:text-[#2f78c2] transition-colors px-2 py-1.5 rounded-lg border border-[#e5e5e3] bg-white hover:bg-gray-50"
            >
              Today
            </button>
          )}
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e5e3] bg-white hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium text-[#1a1a1a] w-32 text-center">
            {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <button
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e5e3] bg-white hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
          {WEEKDAYS.map((w) => (
            <div key={w} className="py-1">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const dateStr = toDateStr(d)
            const inMonth = d.getMonth() === viewDate.getMonth()
            const isToday = dateStr === today
            const isSelected = dateStr === selectedDate
            const dayMeetings = meetingsByDate[dateStr] || []
            const dots = dayMeetings.slice(0, 3)
            const overflow = dayMeetings.length - dots.length

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`relative aspect-square rounded-lg flex flex-col items-center justify-center gap-1 text-sm transition-colors
                  ${!inMonth ? 'text-gray-300' : 'text-[#1a1a1a]'}
                  ${isSelected ? 'bg-[#378ADD] text-white' : 'hover:bg-gray-100'}
                `}
              >
                <span className={isToday && !isSelected ? 'font-semibold text-[#378ADD]' : ''}>
                  {d.getDate()}
                </span>
                {dots.length > 0 && (
                  <span className="flex items-center gap-0.5">
                    {dots.map((m) => (
                      <span
                        key={m.id}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: isSelected ? 'white' : MEETING_TYPES[m.type].colour,
                        }}
                      />
                    ))}
                    {overflow > 0 && (
                      <span
                        className={`text-[9px] leading-none font-medium ${
                          isSelected ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        +{overflow}
                      </span>
                    )}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-4 pt-3 border-t border-[#f0f0ee]">
          {Object.values(MEETING_TYPES).map(({ label, colour }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <ColourDot colour={colour} size={7} />
              {label}
            </span>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-[#1a1a1a]">
            {formatDate(selectedDate, { withWeekday: true })}
          </h2>
          <button
            onClick={() => setQuickAddOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-[#378ADD] hover:text-[#2f78c2] transition-colors"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        {selectedMeetings.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No meetings on this day.</p>
        ) : (
          <div className="divide-y divide-[#f0f0ee] mt-2">
            {selectedMeetings.map((m) => (
              <MeetingRow key={m.id} meeting={m} />
            ))}
          </div>
        )}
      </Card>

      <button
        onClick={() => setQuickAddOpen(true)}
        aria-label="Quick add"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#378ADD] text-white shadow-lg hover:bg-[#2f78c2] active:scale-95 transition-all"
      >
        <Plus size={26} />
      </button>

      {quickAddOpen && (
        <QuickAddModal onClose={() => setQuickAddOpen(false)} defaultMeetingDate={selectedDate} />
      )}
    </div>
  )
}
