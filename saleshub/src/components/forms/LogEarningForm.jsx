import { useState, useMemo } from 'react'
import { Field, Input, Select, ModalActions } from '../Modal'
import { EARNING_NOTES } from '../../lib/constants'
import { useData } from '../../lib/DataContext'
import { toDateStr } from '../../lib/format'

export default function LogEarningForm({ onDone, onCancel, defaultClientId = '' }) {
  const { clients, meetings, addEarning } = useData()
  const [form, setForm] = useState({
    amount: '',
    clientId: defaultClientId,
    meetingId: '',
    note: EARNING_NOTES[0],
    date: toDateStr(new Date()),
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const clientMeetings = useMemo(
    () => meetings.filter((m) => !form.clientId || m.clientId === form.clientId),
    [meetings, form.clientId]
  )

  const submit = (e) => {
    e.preventDefault()
    const amount = Number(form.amount)
    if (!amount || !form.clientId) return
    addEarning({
      amount,
      clientId: form.clientId,
      meetingId: form.meetingId || null,
      note: form.note,
      date: form.date,
    })
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Amount (R)">
        <Input
          type="number"
          min={0}
          step="0.01"
          value={form.amount}
          onChange={update('amount')}
          placeholder="0.00"
          required
          autoFocus
        />
      </Field>
      <Field label="Client">
        <Select value={form.clientId} onChange={update('clientId')} required>
          <option value="" disabled>
            Select a client
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Meeting (optional)">
        <Select value={form.meetingId} onChange={update('meetingId')}>
          <option value="">No linked meeting</option>
          {clientMeetings.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title} &middot; {m.date}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Note">
          <Select value={form.note} onChange={update('note')}>
            {EARNING_NOTES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Date">
          <Input type="date" value={form.date} onChange={update('date')} required />
        </Field>
      </div>
      <ModalActions onCancel={onCancel} submitLabel="Log earning" />
    </form>
  )
}
