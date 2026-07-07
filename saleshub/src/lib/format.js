const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// South African date format: 7 Jul 2026
export function formatDate(dateStr, { withWeekday = false } = {}) {
  const d = parseDate(dateStr)
  const base = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  if (!withWeekday) return base
  const weekday = d.toLocaleDateString('en-ZA', { weekday: 'long' })
  return `${weekday}, ${base}`
}

export function formatDayMonth(dateStr) {
  const d = parseDate(dateStr)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function formatCurrency(amount) {
  const rounded = Math.round(amount)
  const formatted = rounded.toLocaleString('en-ZA').replace(/,/g, ' ')
  return `R ${formatted}`
}

export function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isSameDay(a, b) {
  return a === b
}

export function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function isWithinDays(dateStr, refDate, days) {
  const d = parseDate(dateStr)
  const diff = (d - refDate) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff < days
}
