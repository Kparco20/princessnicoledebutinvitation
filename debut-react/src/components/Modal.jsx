import React, { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children, size = 'md', overlayZ = 50, contentClass = '', hasBackground = false, backgroundImage = '' }) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Lock body scroll using a simple counter so nested modals are supported
    window.__modalCount = (window.__modalCount || 0) + 1
    document.body.style.overflow = 'hidden'

    // focus management: move focus to the dialog
    const prevActive = document.activeElement
    const timer = setTimeout(() => {
      if (closeButtonRef.current) closeButtonRef.current.focus()
      else if (panelRef.current) panelRef.current.focus()
    }, 50)

    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose()
    }

    document.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      window.__modalCount = (window.__modalCount || 1) - 1
      if (!window.__modalCount) {
        document.body.style.overflow = ''
      }
      if (prevActive && prevActive.focus) prevActive.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl'
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: overlayZ }}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" onClick={(e) => { if (e.target === e.currentTarget) onClose && onClose() }} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`${sizes[size]} w-[90%] mx-auto ${hasBackground ? 'relative overflow-hidden' : 'bg-white'} rounded-2xl shadow-2xl transform transition-all animate-modal-in ${contentClass}`}
        style={hasBackground ? {
          backgroundImage: `url('${backgroundImage || '/assets/IMG_1.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: overlayZ + 1
        } : { zIndex: overlayZ + 1 }}
      >
        {hasBackground && <div className="absolute inset-0 bg-black/20"></div>}
        <div className={`relative z-10 p-6 ${hasBackground ? 'bg-white/50 rounded-lg' : ''}`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 id="modal-title" className="text-2xl font-semibold">{title}</h2>
            <button ref={closeButtonRef} aria-label="Close modal" className="ml-auto text-2xl leading-none" onClick={() => onClose && onClose()}>&times;</button>
          </div>
          <div className="modal-content">{children}</div>
        </div>

      </div>
    </div>
  )
}
