import { useState } from 'react'
import { Field, Input, ModalActions } from '../Modal'
import { useData } from '../../lib/DataContext'

const PALETTE = ['#378ADD', '#1D9E75', '#EF9F27', '#D85A30', '#7C5CE0', '#4EA5A5']

function initialsOf(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

export default function AddClientForm({ onDone, onCancel }) {
  const { clients, addClient } = useData()
  const [name, setName] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    addClient({
      name: trimmed,
      initials: initialsOf(trimmed),
      colour: PALETTE[clients.length % PALETTE.length],
    })
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Client name">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Priya Naidoo"
          required
          autoFocus
        />
      </Field>
      <ModalActions onCancel={onCancel} submitLabel="Add client" />
    </form>
  )
}
