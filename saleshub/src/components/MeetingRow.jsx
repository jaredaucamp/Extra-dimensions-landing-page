import { useState } from 'react'
import ColourDot from './ColourDot'
import OutcomeTag from './OutcomeTag'
import Modal from './Modal'
import EditMeetingForm from './forms/EditMeetingForm'
import { MEETING_TYPES } from '../lib/constants'
import { useData } from '../lib/DataContext'
import { formatTime } from '../lib/format'

export default function MeetingRow({ meeting }) {
  const { clients } = useData()
  const [editOpen, setEditOpen] = useState(false)
  const client = clients.find((c) => c.id === meeting.clientId)
  const type = MEETING_TYPES[meeting.type]

  return (
    <>
      <button
        onClick={() => setEditOpen(true)}
        className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
      >
        <ColourDot colour={type.colour} size={9} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#1a1a1a] truncate">{meeting.title}</p>
          <p className="text-xs text-gray-500 truncate">
            {client ? client.name : type.label}
          </p>
        </div>
        <span className="text-xs text-gray-500 shrink-0">{formatTime(meeting.time)}</span>
        <div className="shrink-0 w-20 flex justify-end">
          <OutcomeTag outcome={meeting.outcome} />
        </div>
      </button>

      {editOpen && (
        <Modal title="Edit meeting" onClose={() => setEditOpen(false)}>
          <EditMeetingForm
            meeting={meeting}
            onDone={() => setEditOpen(false)}
            onCancel={() => setEditOpen(false)}
          />
        </Modal>
      )}
    </>
  )
}
