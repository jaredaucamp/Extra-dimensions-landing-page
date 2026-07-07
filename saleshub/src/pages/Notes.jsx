import { useEffect, useMemo, useRef, useState } from 'react'
import { useData } from '../lib/DataContext'
import { formatDate } from '../lib/format'
import Card from '../components/Card'

export default function Notes() {
  const { today, dailyNotes } = useData()

  const days = useMemo(() => {
    const dates = new Set(dailyNotes.map((n) => n.date))
    dates.add(today)
    return Array.from(dates).sort((a, b) => b.localeCompare(a))
  }, [dailyNotes, today])

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-xl font-semibold text-[#1a1a1a]">Notes</h1>
        <p className="text-sm text-gray-500 mt-1">Daily notes, autosaved as you type.</p>
      </div>

      <div className="space-y-4">
        {days.map((date) => (
          <DailyNoteCard key={date} date={date} isToday={date === today} />
        ))}
      </div>
    </div>
  )
}

function DailyNoteCard({ date, isToday }) {
  const { dailyNotes, saveDailyNote } = useData()
  const existing = dailyNotes.find((n) => n.date === date)
  const [value, setValue] = useState(existing?.content || '')
  const [savedFlash, setSavedFlash] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const handleChange = (e) => {
    const next = e.target.value
    setValue(next)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      saveDailyNote(date, next)
      setSavedFlash(true)
      setTimeout(() => setSavedFlash(false), 1200)
    }, 500)
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-[#1a1a1a]">
          {formatDate(date, { withWeekday: true })}
          {isToday && (
            <span className="ml-2 text-xs font-medium text-[#378ADD] bg-[#E6F1FB] rounded-full px-2 py-0.5">
              Today
            </span>
          )}
        </h2>
        <span
          className={`text-xs text-gray-400 transition-opacity ${
            savedFlash ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Saved
        </span>
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Write today's notes..."
        rows={4}
        className="w-full resize-none text-sm text-[#1a1a1a] placeholder:text-gray-300 focus:outline-none"
      />
    </Card>
  )
}
