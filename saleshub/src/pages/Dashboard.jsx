import { useMemo, useState } from 'react'
import { Plus, Bell, AlertCircle } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { formatCurrency, formatDate, parseDate, startOfWeek } from '../lib/format'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import MeetingRow from '../components/MeetingRow'
import QuickAddModal from '../components/QuickAddModal'

export default function Dashboard() {
  const { today, meetings, earnings, reminders, toggleReminder } = useData()
  const [quickAddOpen, setQuickAddOpen] = useState(false)

  const todayDate = parseDate(today)

  const todaysMeetings = useMemo(
    () =>
      meetings
        .filter((m) => m.date === today)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [meetings, today]
  )

  const weekEarnings = useMemo(() => {
    const weekStart = startOfWeek(todayDate)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    return earnings
      .filter((e) => {
        const d = parseDate(e.date)
        return d >= weekStart && d < weekEnd
      })
      .reduce((sum, e) => sum + e.amount, 0)
  }, [earnings, todayDate])

  const pendingReminders = useMemo(
    () => reminders.filter((r) => !r.done),
    [reminders]
  )

  const followUpsDue = useMemo(
    () => pendingReminders.filter((r) => parseDate(r.dueDate) <= todayDate).length,
    [pendingReminders, todayDate]
  )

  const overdue = pendingReminders
    .filter((r) => parseDate(r.dueDate) < todayDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  const upcoming = pendingReminders
    .filter((r) => parseDate(r.dueDate) >= todayDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-xl font-semibold text-[#1a1a1a]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening today.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <StatCard label="This week" value={formatCurrency(weekEarnings)} accent="#1D9E75" />
        <StatCard label="Today's meetings" value={todaysMeetings.length} accent="#378ADD" />
        <StatCard label="Follow-ups due" value={followUpsDue} accent="#EF9F27" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-[#1a1a1a] mb-1">Today's schedule</h2>
          <p className="text-xs text-gray-400 mb-2">{formatDate(today, { withWeekday: true })}</p>
          {todaysMeetings.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">No meetings today.</p>
          ) : (
            <div className="divide-y divide-[#f0f0ee]">
              {todaysMeetings.map((m) => (
                <MeetingRow key={m.id} meeting={m} />
              ))}
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-[#1a1a1a] mb-3">Reminders</h2>
          {pendingReminders.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">You're all caught up.</p>
          ) : (
            <div className="space-y-3">
              {overdue.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#D64545] flex items-center gap-1">
                    <AlertCircle size={13} /> Overdue
                  </p>
                  {overdue.map((r) => (
                    <ReminderRow key={r.id} reminder={r} onToggle={toggleReminder} overdue />
                  ))}
                </div>
              )}
              {upcoming.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Bell size={13} /> Upcoming
                  </p>
                  {upcoming.map((r) => (
                    <ReminderRow key={r.id} reminder={r} onToggle={toggleReminder} />
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      <button
        onClick={() => setQuickAddOpen(true)}
        aria-label="Quick add"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#378ADD] text-white shadow-lg hover:bg-[#2f78c2] active:scale-95 transition-all"
      >
        <Plus size={26} />
      </button>

      {quickAddOpen && <QuickAddModal onClose={() => setQuickAddOpen(false)} />}
    </div>
  )
}

function ReminderRow({ reminder, onToggle, overdue }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={reminder.done}
        onChange={() => onToggle(reminder.id)}
        className="mt-0.5 accent-[#378ADD]"
      />
      <div className="min-w-0">
        <p className="text-sm text-[#1a1a1a] group-hover:text-[#378ADD] transition-colors">
          {reminder.text}
        </p>
        <p className={`text-xs ${overdue ? 'text-[#D64545]' : 'text-gray-400'}`}>
          {formatDate(reminder.dueDate)}
          {reminder.dueTime && ` · ${reminder.dueTime}`}
        </p>
      </div>
    </label>
  )
}
