import { useState } from 'react'
import { Field, Input, ModalActions } from '../Modal'
import { useData } from '../../lib/DataContext'
import { toDateStr } from '../../lib/format'

export default function AddReminderForm({ onDone, onCancel }) {
  const { addReminder } = useData()
  const [form, setForm] = useState({ text: '', dueDate: toDateStr(new Date()), dueTime: '' })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.text.trim()) return
    addReminder({ ...form, dueTime: form.dueTime || null })
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Reminder">
        <Input
          value={form.text}
          onChange={update('text')}
          placeholder="e.g. Send proposal to..."
          required
          autoFocus
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Due date">
          <Input type="date" value={form.dueDate} onChange={update('dueDate')} required />
        </Field>
        <Field label="Due time (optional)">
          <Input type="time" value={form.dueTime} onChange={update('dueTime')} />
        </Field>
      </div>
      <ModalActions onCancel={onCancel} submitLabel="Add reminder" />
    </form>
  )
}
