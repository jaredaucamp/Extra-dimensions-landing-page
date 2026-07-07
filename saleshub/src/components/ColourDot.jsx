export default function ColourDot({ colour, size = 8 }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{ backgroundColor: colour, width: size, height: size }}
    />
  )
}
