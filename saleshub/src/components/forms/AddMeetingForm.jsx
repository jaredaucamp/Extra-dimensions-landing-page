import { useState } from 'react'
import { Field, Input, Select, ModalActions } from '../Modal'
import { MEETING_TYPES } from '../../lib/constants'
import { useData } from '../../lib/DataContext'
import { toDateStr } from '../../lib/format'

export default function AddMeetingForm({ onDone, onCancel }) {
  const { clients, addMeeting, today } = useData()
  const [form, setForm] = useState({
    title: '',
    date: today || toDateStr(new Date()),
    time: '09:00',
    duration: 30,
    type: 'client-call',
    clientId: '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    addMeeting({
      ...form,
      duration: Number(form.duration),
      clientId: form.clientId || null,
    })
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Meeting title">
        <Input
          value={form.title}
          onChange={update('title')}
          placeholder="e.g. Proposal walkthrough"
          required
          autoFocus
        />
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
      <ModalActions onCancel={onCancel} submitLabel="Add meeting" />
    </form>
  )
}
