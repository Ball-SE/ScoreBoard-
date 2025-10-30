import React, { useEffect } from 'react'

export default function Toast({ open, type = 'success', message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [open, duration, onClose])

  if (!open) return null

  const base = 'fixed top-6 right-6 z-50 rounded-lg shadow-lg px-4 py-3 text-sm flex items-center gap-3'
  const style =
    type === 'success' ? 'bg-green-600 text-white'
    : type === 'error' ? 'bg-red-600 text-white'
    : 'bg-gray-800 text-white'

  return (
    <div className={`${base} ${style}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 rounded px-2 py-1 hover:bg-black/20">
        ×
      </button>
    </div>
  )
}