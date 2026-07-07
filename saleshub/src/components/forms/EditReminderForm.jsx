import { useState } from 'react'
import { Field, Input, Textarea, ModalActions } from '../Modal'
import { useData } from '../../lib/DataContext'

export default function EditReminderForm({ reminder, onDone, onCancel }) {
  const { updateReminder } = useData()
  const [form, setForm] = useState({
    text: reminder.text,
    dueDate: reminder.dueDate,
    dueTime: reminder.dueTime || '',
    notes: reminder.notes || '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.text.trim()) return
    updateReminder(reminder.id, { ...form, dueTime: form.dueTime || null })
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Reminder">
        <Input value={form.text} onChange={update('text')} required autoFocus />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Due date">
          <Input type="date" value={form.dueDate} onChange={update('dueDate')} required />
        </Field>
        <Field label="Due time (optional)">
          <Input type="time" value={form.dueTime} onChange={update('dueTime')} />
        </Field>
      </div>
      <Field label="Notes">
        <Textarea
          rows={4}
          value={form.notes}
          onChange={update('notes')}
          placeholder="Any extra context..."
        />
      </Field>
      <ModalActions onCancel={onCancel} submitLabel="Save changes" />
    </form>
  )
}
