import { useEffect } from 'react'

export default function Modal({ title, onClose, children, width = 420 }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full bg-white rounded-[10px] border border-[#e5e5e3] shadow-xl max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: width }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e3]">
          <h2 className="text-base font-semibold text-[#1a1a1a]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            &times;
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-gray-600 mb-1.5">{label}</span>
      {children}
    </label>
  )
}

const inputClasses =
  'w-full rounded-lg border border-[#e5e5e3] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#378ADD] focus:ring-1 focus:ring-[#378ADD] transition-colors'

export function Input(props) {
  return <input className={inputClasses} {...props} />
}

export function Select(props) {
  return (
    <select className={`${inputClasses} bg-white`} {...props}>
      {props.children}
    </select>
  )
}

export function Textarea(props) {
  return <textarea className={`${inputClasses} resize-none`} {...props} />
}

export function ModalActions({ onCancel, submitLabel = 'Save' }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-[#378ADD] hover:bg-[#2f78c2] transition-colors"
      >
        {submitLabel}
      </button>
    </div>
  )
}
