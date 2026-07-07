import { useMemo, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { useData } from '../lib/DataContext'
import { formatCurrency, formatDate } from '../lib/format'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import Modal from '../components/Modal'
import AddClientForm from '../components/forms/AddClientForm'
import MeetingRow from '../components/MeetingRow'

export default function Clients() {
  const { clients, meetings, earnings } = useData()
  const [selectedId, setSelectedId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const clientStats = useMemo(() => {
    const map = {}
    for (const c of clients) {
      const clientMeetings = meetings.filter((m) => m.clientId === c.id)
      const total = earnings
        .filter((e) => e.clientId === c.id)
        .reduce((sum, e) => sum + e.amount, 0)
      map[c.id] = { meetingCount: clientMeetings.length, total }
    }
    return map
  }, [clients, meetings, earnings])

  const selectedClient = clients.find((c) => c.id === selectedId)

  if (selectedClient) {
    return (
      <ClientDetail
        client={selectedClient}
        onBack={() => setSelectedId(null)}
      />
    )
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#1a1a1a]">Clients</h1>
          <p className="text-sm text-gray-500 mt-1">{clients.length} clients</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[#378ADD] text-white text-sm font-medium px-3.5 py-2 hover:bg-[#2f78c2] transition-colors"
        >
          <Plus size={16} /> Add client
        </button>
      </div>

      <Card className="p-2">
        <div className="divide-y divide-[#f0f0ee]">
          {clients.map((c) => {
            const stats = clientStats[c.id]
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <Avatar initials={c.initials} colour={c.colour} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#1a1a1a] truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">
                    {stats.meetingCount} meeting{stats.meetingCount === 1 ? '' : 's'}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#1D9E75] shrink-0">
                  {formatCurrency(stats.total)}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      {modalOpen && (
        <Modal title="Add client" onClose={() => setModalOpen(false)}>
          <AddClientForm onDone={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

function ClientDetail({ client, onBack }) {
  const { meetings, earnings } = useData()

  const clientMeetings = meetings
    .filter((m) => m.clientId === client.id)
    .sort((a, b) => b.date.localeCompare(a.date))

  const clientEarnings = earnings
    .filter((e) => e.clientId === client.id)
    .sort((a, b) => b.date.localeCompare(a.date))

  const total = clientEarnings.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6 pb-16">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a1a1a] transition-colors"
      >
        <ArrowLeft size={16} /> Back to clients
      </button>

      <div className="flex items-center gap-4">
        <Avatar initials={client.initials} colour={client.colour} size={52} />
        <div>
          <h1 className="text-xl font-semibold text-[#1a1a1a]">{client.name}</h1>
          <p className="text-sm text-gray-500">
            {clientMeetings.length} meeting{clientMeetings.length === 1 ? '' : 's'} &middot;{' '}
            <span className="text-[#1D9E75] font-medium">{formatCurrency(total)}</span> earned
          </p>
        </div>
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-[#1a1a1a] mb-2">Meetings</h2>
        {clientMeetings.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No meetings yet.</p>
        ) : (
          <div className="divide-y divide-[#f0f0ee]">
            {clientMeetings.map((m) => (
              <div key={m.id} className="py-3">
                <MeetingRow meeting={m} />
                {m.notes && (
                  <p className="text-xs text-gray-500 mt-1 pl-5 leading-relaxed">{m.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-[#1a1a1a] mb-2">Earnings history</h2>
        {clientEarnings.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No earnings logged yet.</p>
        ) : (
          <div className="divide-y divide-[#f0f0ee]">
            {clientEarnings.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">{e.note}</p>
                  <p className="text-xs text-gray-400">{formatDate(e.date)}</p>
                </div>
                <span className="text-sm font-semibold text-[#1D9E75]">
                  {formatCurrency(e.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
