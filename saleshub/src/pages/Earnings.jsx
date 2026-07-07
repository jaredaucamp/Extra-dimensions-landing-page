import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { formatCurrency, formatDate, parseDate, startOfWeek } from '../lib/format'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Modal from '../components/Modal'
import LogEarningForm from '../components/forms/LogEarningForm'

export default function Earnings() {
  const { today, earnings, clients, meetings } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const todayDate = parseDate(today)

  const weekTotal = useMemo(() => {
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

  const monthTotal = useMemo(
    () =>
      earnings
        .filter((e) => {
          const d = parseDate(e.date)
          return d.getFullYear() === todayDate.getFullYear() && d.getMonth() === todayDate.getMonth()
        })
        .reduce((sum, e) => sum + e.amount, 0),
    [earnings, todayDate]
  )

  const sorted = useMemo(
    () => earnings.slice().sort((a, b) => b.date.localeCompare(a.date)),
    [earnings]
  )

  const clientName = (id) => clients.find((c) => c.id === id)?.name || 'Unknown client'
  const meetingName = (id) => meetings.find((m) => m.id === id)?.title

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#1a1a1a]">Earnings</h1>
          <p className="text-sm text-gray-500 mt-1">Track what's coming in.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[#378ADD] text-white text-sm font-medium px-3.5 py-2 hover:bg-[#2f78c2] transition-colors"
        >
          <Plus size={16} /> Log earning
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <StatCard label="This week" value={formatCurrency(weekTotal)} accent="#1D9E75" />
        <StatCard label="This month" value={formatCurrency(monthTotal)} accent="#1D9E75" />
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-[#1a1a1a] mb-3">Recent earnings</h2>
        {sorted.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No earnings logged yet.</p>
        ) : (
          <div className="divide-y divide-[#f0f0ee]">
            {sorted.map((e) => (
              <div key={e.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#1a1a1a] truncate">{clientName(e.clientId)}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {meetingName(e.meetingId) ? `${meetingName(e.meetingId)} · ` : ''}
                    {e.note}
                  </p>
                </div>
                <span className="text-xs text-gray-400 shrink-0 hidden sm:inline">
                  {formatDate(e.date)}
                </span>
                <span className="text-sm font-semibold shrink-0" style={{ color: '#1D9E75' }}>
                  {formatCurrency(e.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {modalOpen && (
        <Modal title="Log earning" onClose={() => setModalOpen(false)}>
          <LogEarningForm onDone={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}
