import { OUTCOMES } from '../lib/constants'

export default function OutcomeTag({ outcome }) {
  const config = OUTCOMES[outcome]
  if (!config) return null

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.fg }}
    >
      {config.label}
    </span>
  )
}
