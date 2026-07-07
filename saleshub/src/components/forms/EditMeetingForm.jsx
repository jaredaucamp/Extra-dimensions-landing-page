import { useState } from 'react'
import { Field, Input, Select, Textarea, ModalActions } from '../Modal'
import { MEETING_TYPES, OUTCOMES } from '../../lib/constants'
import { useData } from '../../lib/DataContext'

export default function EditMeetingForm({ meeting, onDone, onCancel }) {
  const { clients, updateMeeting } = useData()
  const [form, setForm] = useState({
    title: meeting.title,
    date: meeting.date,
    time: meeting.time,
    duration: meeting.duration,
    type: meeting.type,
    clientId: meeting.clientId || '',
    outcome: meeting.outcome || 'none',
    earning: meeting.earning || 0,
    notes: meeting.notes || '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    updateMeeting(meeting.id, {
      ...form,
      duration: Number(form.duration),
      earning: Number(form.earning) || 0,
      clientId: form.clientId || null,
    })
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Meeting title">
        <Input value={form.title} onChange={update('title')} required autoFocus />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <Input type="date" value={form.date} onChange={update('date')} required />
        </Field>
        <Field label="Time">
          <Input type="time" value={form.time} onChange={update('time')} required />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Type">
          <Select value={form.type} onChange={update('type')}>
            {Object.entries(MEETING_TYPES).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Duration (min)">
          <Input type="number" min={5} step={5} value={form.duration} onChange={update('duration')} />
        </Field>
      </div>
      <Field label="Client (optional)">
        <Select value={form.clientId} onChange={update('clientId')}>
          <option value="">No client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Outcome">
          <Select value={form.outcome} onChange={update('outcome')}>
            {Object.keys(OUTCOMES).map((value) => (
              <option key={value} value={value}>
                {value === 'none' ? 'None' : OUTCOMES[value].label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Earning (R, optional)">
          <Input type="number" min={0} step="0.01" value={form.earning} onChange={update('earning')} />
        </Field>
      </div>
      <Field label="Notes">
        <Textarea
          rows={4}
          value={form.notes}
          onChange={update('notes')}
          placeholder="What happened, what's next..."
        />
      </Field>
      <ModalActions onCancel={onCancel} submitLabel="Save changes" />
    </form>
  )
}
