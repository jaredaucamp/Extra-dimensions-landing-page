import ColourDot from './ColourDot'
import OutcomeTag from './OutcomeTag'
import { MEETING_TYPES } from '../lib/constants'
import { useData } from '../lib/DataContext'

export default function MeetingRow({ meeting }) {
  const { clients } = useData()
  const client = clients.find((c) => c.id === meeting.clientId)
  const type = MEETING_TYPES[meeting.type]

  return (
    <div className="flex items-center gap-3 py-3">
      <ColourDot colour={type.colour} size={9} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#1a1a1a] truncate">{meeting.title}</p>
        <p className="text-xs text-gray-500 truncate">
          {client ? client.name : type.label}
        </p>
      </div>
      <span className="text-xs text-gray-500 shrink-0">{meeting.time}</span>
      <div className="shrink-0 w-20 flex justify-end">
        <OutcomeTag outcome={meeting.outcome} />
      </div>
    </div>
  )
}
