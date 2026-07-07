export default function Avatar({ initials, colour, size = 40 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0"
      style={{
        backgroundColor: colour,
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </span>
  )
}
