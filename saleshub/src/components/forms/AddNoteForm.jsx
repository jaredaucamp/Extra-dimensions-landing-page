import { useState } from 'react'
import { Field, Textarea, ModalActions } from '../Modal'
import { useData } from '../../lib/DataContext'

export default function AddNoteForm({ onDone, onCancel }) {
  const { today, dailyNotes, saveDailyNote } = useData()
  const [content, setContent] = useState('')
  const existing = dailyNotes.find((n) => n.date === today)

  const submit = (e) => {
    e.preventDefault()
    if (!content.trim()) return
    const merged = existing?.content
      ? `${existing.content}\n${content.trim()}`
      : content.trim()
    saveDailyNote(today, merged)
    onDone()
  }

  return (
    <form onSubmit={submit}>
      <Field label="Add to today's note">
        <Textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Jot down something quick..."
          autoFocus
        />
      </Field>
      <ModalActions onCancel={onCancel} submitLabel="Add note" />
    </form>
  )
}
