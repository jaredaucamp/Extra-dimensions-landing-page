import { useState } from 'react'
import Modal from './Modal'
import EditReminderForm from './forms/EditReminderForm'
import { useData } from '../lib/DataContext'
import { formatDate, formatTime } from '../lib/format'

export default function ReminderRow({ reminder, overdue }) {
  const { toggleReminder } = useData()
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="flex items-start gap-2.5 group">
      <input
        type="checkbox"
        checked={reminder.done}
        onChange={() => toggleReminder(reminder.id)}
        className="mt-0.5 accent-[#378ADD] cursor-pointer"
      />
      <button
        onClick={() => setEditOpen(true)}
        className="min-w-0 text-left flex-1"
      >
        <p className="text-sm text-[#1a1a1a] group-hover:text-[#378ADD] transition-colors">
          {reminder.text}
        </p>
        <p className={`text-xs ${overdue ? 'text-[#D64545]' : 'text-gray-400'}`}>
          {formatDate(reminder.dueDate)}
          {reminder.dueTime && ` · ${formatTime(reminder.dueTime)}`}
        </p>
        {reminder.notes && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{reminder.notes}</p>
        )}
      </button>

      {editOpen && (
        <Modal title="Edit reminder" onClose={() => setEditOpen(false)}>
          <EditReminderForm
            reminder={reminder}
            onDone={() => setEditOpen(false)}
            onCancel={() => setEditOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}
