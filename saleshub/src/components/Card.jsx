export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-[10px] border border-[#e5e5e3] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
