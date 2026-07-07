import Card from './Card'

export default function StatCard({ label, value, accent, sub }) {
  return (
    <Card className="p-5 flex-1 min-w-[160px]">
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className="mt-2 text-2xl font-semibold"
        style={{ color: accent || '#1a1a1a' }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </Card>
  )
}
