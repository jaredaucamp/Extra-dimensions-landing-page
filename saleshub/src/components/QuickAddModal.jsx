import { useState } from 'react'
import { CalendarPlus, Wallet, StickyNote, BellPlus, ChevronLeft } from 'lucide-react'
import Modal from './Modal'
import AddMeetingForm from './forms/AddMeetingForm'
import LogEarningForm from './forms/LogEarningForm'
import AddNoteForm from './forms/AddNoteForm'
import AddReminderForm from './forms/AddReminderForm'

const OPTIONS = [
  { key: 'meeting', label: 'Add meeting', icon: CalendarPlus },
  { key: 'earning', label: 'Log earning', icon: Wallet },
  { key: 'note', label: 'Add note', icon: StickyNote },
  { key: 'reminder', label: 'Add reminder', icon: BellPlus },
]

const TITLES = {
  meeting: 'Add meeting',
  earning: 'Log earning',
  note: 'Add note',
  reminder: 'Add reminder',
}

export default function QuickAddModal({ onClose, defaultMeetingDate }) {
  const [step, setStep] = useState(null)

  if (!step) {
    return (
      <Modal title="Quick add" onClose={onClose} width={360}>
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setStep(key)}
              className="flex flex-col items-center gap-2 rounded-lg border border-[#e5e5e3] py-5 text-sm font-medium text-[#1a1a1a] hover:border-[#378ADD] hover:bg-[#f5f9fd] transition-colors"
            >
              <Icon size={22} className="text-[#378ADD]" />
              {label}
            </button>
          ))}
        </div>
      </Modal>
    )
  }

  const FormComponent = {
    meeting: AddMeetingForm,
    earning: LogEarningForm,
    note: AddNoteForm,
    reminder: AddReminderForm,
  }[step]

  return (
    <Modal
      title={
        <button
          onClick={() => setStep(null)}
          className="flex items-center gap-1 text-[#1a1a1a] hover:text-[#378ADD]"
        >
          <ChevronLeft size={16} />
          {TITLES[step]}
        </button>
      }
      onClose={onClose}
    >
      <FormComponent
        onDone={onClose}
        onCancel={onClose}
        {...(step === 'meeting' ? { defaultDate: defaultMeetingDate } : {})}
      />
    </Modal>
  )
}
