import { createContext, useContext, useMemo, useState } from 'react'
import {
  TODAY,
  clients as initialClients,
  meetings as initialMeetings,
  earnings as initialEarnings,
  reminders as initialReminders,
  dailyNotes as initialDailyNotes,
} from './mockData'
import { toDateStr } from './format'

const DataContext = createContext(null)

let idCounter = 1000
function nextId(prefix) {
  idCounter += 1
  return `${prefix}${idCounter}`
}

export function DataProvider({ children }) {
  const [clients, setClients] = useState(initialClients)
  const [meetings, setMeetings] = useState(initialMeetings)
  const [earnings, setEarnings] = useState(initialEarnings)
  const [reminders, setReminders] = useState(initialReminders)
  const [dailyNotes, setDailyNotes] = useState(initialDailyNotes)

  const addMeeting = (meeting) => {
    const newMeeting = {
      id: nextId('m'),
      outcome: 'pending',
      notes: '',
      clientId: null,
      earning: 0,
      ...meeting,
    }
    setMeetings((prev) => [...prev, newMeeting])
    return newMeeting
  }

  const addEarning = (earning) => {
    const newEarning = { id: nextId('e'), date: toDateStr(new Date()), ...earning }
    setEarnings((prev) => [newEarning, ...prev])
    return newEarning
  }

  const addReminder = (reminder) => {
    const newReminder = { id: nextId('r'), done: false, notes: '', ...reminder }
    setReminders((prev) => [...prev, newReminder])
    return newReminder
  }

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    )
  }

  const updateMeeting = (id, patch) => {
    setMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  const updateReminder = (id, patch) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const addClient = (client) => {
    const newClient = { id: nextId('c'), ...client }
    setClients((prev) => [...prev, newClient])
    return newClient
  }

  const saveDailyNote = (date, content) => {
    setDailyNotes((prev) => {
      const existing = prev.find((n) => n.date === date)
      if (existing) {
        return prev.map((n) => (n.date === date ? { ...n, content } : n))
      }
      return [...prev, { id: nextId('n'), date, content }]
    })
  }

  const value = useMemo(
    () => ({
      today: TODAY,
      clients,
      meetings,
      earnings,
      reminders,
      dailyNotes,
      addMeeting,
      updateMeeting,
      addEarning,
      addReminder,
      updateReminder,
      toggleReminder,
      addClient,
      saveDailyNote,
    }),
    [clients, meetings, earnings, reminders, dailyNotes]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
