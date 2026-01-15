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
    sm: 'max-w-xs sm:max-w-sm w-[95vw] sm:w-auto max-h-[80vh]',
    md: 'max-w-sm sm:max-w-lg w-[95vw] sm:w-auto max-h-[85vh]',
    lg: 'max-w-lg sm:max-w-3xl w-[95vw] sm:w-auto max-h-[85vh]',
    xl: 'max-w-2xl sm:max-w-5xl w-[95vw] sm:w-auto max-h-[85vh]'
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
        className={`${sizes[size]} w-[90%] mx-auto ${hasBackground ? 'relative overflow-hidden' : 'bg-white'} rounded-3xl shadow-2xl transform transition-all animate-modal-in ${contentClass}`}
        style={hasBackground ? {
          backgroundImage: `url('${backgroundImage || '/assets/IMG_1.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: overlayZ + 1
        } : { zIndex: overlayZ + 1 }}
      >
        {hasBackground && <div className="absolute inset-0 bg-black/5 animate-fade-in"></div>}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 animate-fade-in" style={{animationDelay: '100ms'}}></div>
        <div className={`relative z-10 p-3 sm:p-6 md:p-8 ${hasBackground ? 'bg-white/75 rounded-lg' : ''}`}>
          <div className="flex items-start justify-between gap-2 mb-3 sm:mb-6 animate-fade-in" style={{animationDelay: '150ms'}}>
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full flex-shrink-0"></div>
              <h2 id="modal-title" className="text-lg sm:text-2xl md:text-3xl font-serif-elegant font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">{title}</h2>
            </div>
            <button ref={closeButtonRef} aria-label="Close modal" className="ml-auto text-xl sm:text-3xl leading-none text-gray-600 hover:text-rose-500 transition-colors hover:scale-110 transform duration-200 flex-shrink-0 active:scale-95 sm:hover:scale-125" onClick={() => onClose && onClose()}>✕</button>
          </div>
          <div className="modal-content animate-fade-in overflow-y-auto max-h-[calc(80vh-100px)] sm:max-h-[calc(85vh-140px)]" style={{animationDelay: '200ms'}}>{children}</div>
        </div>

      </div>
    </div>
  )
}
