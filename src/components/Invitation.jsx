import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal'
import events from '../data/events'

// Photoshoot images data - easily scalable and maintainable
const PHOTOSHOOT_IMAGES = [
  { id: 1, src: '/assets/img/IMG_11.JPG', alt: 'Photoshoot - Studio Session 1' },
  { id: 2, src: '/assets/img/IMG_12.JPG', alt: 'Photoshoot - Studio Session 2' },
  { id: 3, src: '/assets/img/IMG_13.JPG', alt: 'Photoshoot - Studio Session 3' },
  { id: 4, src: '/assets/img/IMG_15.JPG', alt: 'Photoshoot - Barbie Picture 1' },
  { id: 5, src: '/assets/img/IMG_16.JPG', alt: 'Photoshoot - Barbie Picture 2' },
  { id: 6, src: '/assets/img/IMG_17.JPG', alt: 'Photoshoot - Barbie Picture 3' },
  { id: 7, src: '/assets/img/IMG_18.jpg', alt: 'Photoshoot - Outdoor Shoot 1' },
  { id: 8, src: '/assets/img/IMG_19.jpg', alt: 'Photoshoot - Outdoor Shoot 2' },
  { id: 9, src: '/assets/img/IMG_20.jpg', alt: 'Photoshoot - Outdoor Shoot 3' },
]

export default function Invitation() {
  const [showEventModal, setShowEventModal] = useState(false)
  const [showEventsModal, setShowEventsModal] = useState(false)
  const [showRosesModal, setShowRosesModal] = useState(false)
  const [showBlessingsModal, setShowBlessingsModal] = useState(false)
  const [showTreasuresModal, setShowTreasuresModal] = useState(false)
  const [showCandlesModal, setShowCandlesModal] = useState(false)
  const [showScentsModal, setShowScentsModal] = useState(false)
  const [showMakeupModal, setShowMakeupModal] = useState(false)
  const [showDressModal, setShowDressModal] = useState(false)
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [showPhotoshootsModal, setShowPhotoshootsModal] = useState(false)
  const [showImageViewerModal, setShowImageViewerModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showRosesCover, setShowRosesCover] = useState(false)
  const [showBlessingsCover, setShowBlessingsCover] = useState(false)

  // Envelope / reveal states
  const [envelopeVisible, setEnvelopeVisible] = useState(true)
  const [envelopeAnimating, setEnvelopeAnimating] = useState(false)
  const [invitationRevealed, setInvitationRevealed] = useState(false)

  const openTimeout = useRef(null)

  useEffect(() => {
    // Hook for element SDK if needed later
    if (window.elementSdk && window.elementSdk.init) {
      window.elementSdk.init({ onConfigChange: () => {} })
    }

    function onKey(e) {
      if (e.key === 'Escape') {
        setShowRosesCover(false)
        setShowBlessingsCover(false)
        setShowRosesModal(false)
        setShowBlessingsModal(false)
        setShowEventsModal(false)
        setShowEventModal(false)
        setShowDressModal(false)
        setShowGiftModal(false)
      }
    }

    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      if (openTimeout.current) clearTimeout(openTimeout.current)
    }
  }, [])

  // keep the body from scrolling while the envelope overlay is visible
  useEffect(() => {
    const prev = document.body.style.overflow
    if (envelopeVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = prev || ''
    }
    return () => { document.body.style.overflow = prev || '' }
  }, [envelopeVisible])

  function handleOpenEnvelope() {
    if (envelopeAnimating || invitationRevealed) return
    setEnvelopeAnimating(true)

    // Match timing with CSS (900ms)
    openTimeout.current = setTimeout(() => {
      setEnvelopeAnimating(false)
      setEnvelopeVisible(false)
      setInvitationRevealed(true)
      openTimeout.current = null
    }, 920)
  }

  return (
    <div className="relative max-w-lg w-full">
      {/* Decorative sparkles */}
      <div className="absolute top-[10%] left-[15%] text-pink-400">✦</div>
      <div className="absolute top-[20%] right-[20%] text-pink-400">✦</div>

      {/* Envelope overlay (rendered via portal to center on viewport) */}
      {envelopeVisible && createPortal(
        <div className="envelope-overlay" role="dialog" aria-label="Invitation envelope" onClick={handleOpenEnvelope}>
          <div
            className={`envelope ${envelopeAnimating ? 'animating open' : ''}`}
            onClick={(e) => { e.stopPropagation(); handleOpenEnvelope() }}
            role="button"
            aria-pressed={envelopeAnimating}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope() }}
            style={{ '--flap-duration': '700ms', '--shrink-duration': '900ms' }}
          >
            <div className="envelope-flap" />
            <div className="envelope-body">
              <div className="absolute top-2 right-2 text-pink-400 text-xs font-light" style={{textShadow: '0 0 4px rgba(247,111,168,0.5)'}}>♥ Sealed</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="envelope-text text-center text-white px-4 sm:px-8 py-6 sm:py-8 max-w-sm bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-2xl border-2 border-white/30 space-y-3 sm:space-y-4">
                <div className="flex justify-center gap-1 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl animate-bounce" style={{animationDelay: '0s'}}>✨</span>
                  <span className="text-xl sm:text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>💌</span>
                  <span className="text-xl sm:text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
                </div>
                
                <p className="text-xs font-light tracking-widest uppercase text-white/90">You're Invited</p>
                
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-white drop-shadow-lg">
                    Please click envelope to confirm your attendance
                  </p>
                  <p className="text-xs sm:text-sm font-light text-white/95 drop-shadow-md">
                    Your RSVP will help us finalize the arrangements for this special milestone celebration
                  </p>
                </div>

                <div className="pt-2 border-t border-white/30">
                  <p className="text-xs font-serif italic text-white/90 drop-shadow-md">
                    "Click the small envelope inside to explore the details of events"
                  </p>
                </div>

                <div className="flex justify-center gap-1 mt-2 sm:mt-3">
                  <span className="text-base sm:text-lg">💕</span>
                  <span className="text-base sm:text-lg">💕</span>
                  <span className="text-base sm:text-lg">💕</span>
                </div>
              </div>
            </div>          </div>
        </div>, document.body
      )}

      <div id="card-container" className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12 text-center border border-pink-400/30 bg-gradient-to-b from-[rgba(200,150,180,0.6)] to-[rgba(240,180,200,0.7)] shadow-[0_25px_80px_rgba(0,0,0,0.5)] ${invitationRevealed ? 'card-revealed' : 'card-hidden'}`}>
        <img src="/assets/image.png" alt="Celebrant" className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl filter brightness-[0.55] saturate-[0.95]" />
        <div className="relative z-10">
          <div className="mb-4 sm:mb-6">
            <svg className="w-14 sm:w-20 h-14 sm:h-20 mx-auto text-pink-500" viewBox="0 0 100 60" fill="currentColor"><path d="M50 5 L55 25 L70 15 L65 35 L85 25 L75 45 L95 40 L80 55 L20 55 L5 40 L25 45 L15 25 L35 35 L30 15 L45 25 Z" fill="none" stroke="currentColor" strokeWidth="2" /> <circle cx="50" cy="8" r="4" fill="currentColor" /> </svg>
          </div>
          <p className="text-pink-300/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-2 sm:mb-4 font-light" style={{textShadow: '0 0 10px rgba(247,111,168,0.5)'}}>You are cordially invited to</p>
          <h1 className="font-serif-elegant text-3xl sm:text-5xl md:text-6xl font-bold text-pink-100 mb-2 drop-shadow-[0_2px_20px_rgba(247,111,168,0.3)] leading-tight" style={{textShadow: '0 0 20px rgba(247,111,168,0.6)'}}>Princess Nicole Catapang Mendoza</h1>

          <div className="flex items-center justify-center gap-2 sm:gap-4 my-4 sm:my-6">
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-pink-400/50" />
            <div className="relative"><span className="font-serif-elegant text-5xl sm:text-7xl md:text-8xl font-bold text-pink-400">18</span><span className="absolute -top-1 sm:-top-2 -right-4 sm:-right-6 text-pink-300 text-sm sm:text-lg">th</span></div>
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-pink-400/50" />
          </div>

          <p className="font-serif-elegant text-xl sm:text-3xl italic text-pink-200/90 mb-6 sm:mb-8" style={{textShadow: '0 0 12px rgba(247,111,168,0.5)'}}>Birthday Debut</p>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="text-center">
              <div className="text-pink-300 text-xs sm:text-sm mb-1 sm:mb-2" style={{textShadow: '0 0 6px rgba(247,111,168,0.4)'}}>Click Me</div>
              <button aria-label="Open event details" onClick={() => setShowEventModal(true)} className="bg-none border-none p-1 sm:p-2">
                <svg className="w-8 sm:w-12 h-8 sm:h-12 text-pink-400 hover:text-pink-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M2 6l10 7.5L22 6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> <line x1="16" y1="2" x2="16" y2="6"></line> <line x1="8" y1="2" x2="8" y2="6"></line> <line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <p className="text-pink-100/90 text-sm sm:text-lg font-light tracking-wide" style={{textShadow: '0 0 8px rgba(255,255,255,0.3)'}}>Friday, January 23, 2026</p>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /> <polyline points="12,6 12,12 16,14"></polyline></svg>
              <p className="text-pink-100/90 text-sm sm:text-lg font-light tracking-wide" style={{textShadow: '0 0 8px rgba(255,255,255,0.3)'}}>5:30 PM</p>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /> <circle cx="12" cy="10" r="3" /></svg>
              <div className="text-center">
                <p className="text-pink-100 text-sm sm:text-lg font-medium" style={{textShadow: '0 0 8px rgba(255,255,255,0.3)'}}>EF Faderon Commercial Building</p>
                <p className="text-pink-300/90 text-xs sm:text-sm font-light" style={{textShadow: '0 0 6px rgba(255,255,255,0.2)'}}>LYF Events Place, 4th floor</p>
              </div>
            </div>
          </div>

          <div className="my-4 sm:my-8 py-4 sm:py-6 border-t border-b border-pink-400/20">
            <p className="font-serif-elegant text-sm sm:text-lg italic text-pink-200/80 leading-relaxed px-2 sm:px-4" style={{textShadow: '0 0 10px rgba(247,111,168,0.4)'}}>"Join me as I celebrate this milestone and embrace the journey to adulthood. Your presence would make this day truly unforgettable."</p>
          </div>

          <div className="mt-8 flex justify-center">
            <svg className="w-16 h-8 text-pink-400/50" viewBox="0 0 64 32" fill="none"><path d="M0 16 Q16 0 32 16 Q48 32 64 16" stroke="currentColor" strokeWidth="1.5" fill="none" /> <circle cx="32" cy="16" r="3" fill="currentColor" /></svg>
          </div>
        </div>
      </div>

      {/* Modals (refactored) */}
      
      {/* Event details */}
      <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="Event Details" size="md" overlayZ={40} contentClass="bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 border-4 border-pink-300 shadow-2xl">
        <div className="space-y-6">
          {/* Decorative header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-pink-400"></div>
            <span className="text-pink-500">✨</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-pink-400"></div>
          </div>

          {/* Event Details Cards */}
          <div className="space-y-3 sm:space-y-4">
            {/* Date Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-pink-400 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-pink-600 tracking-widest uppercase">📅 Date</p>
              <p className="text-base sm:text-lg font-serif text-gray-800 mt-1">Friday, January 23, 2026</p>
            </div>

            {/* Time Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-purple-400 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-purple-600 tracking-widest uppercase">🕐 Time</p>
              <p className="text-base sm:text-lg font-serif text-gray-800 mt-1">5:30 PM</p>
            </div>

            {/* Venue Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-rose-400 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-rose-600 tracking-widest uppercase">📍 Venue</p>
              <p className="text-xs sm:text-sm font-serif text-gray-800 mt-2 leading-relaxed">
                <span className="font-bold block">EF Faderon Commercial Building</span>
                <span className="text-gray-700">LYF Events Place, 4th floor</span>
              </p>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-300"></div>
            <span className="text-pink-400 text-xs sm:text-sm">♥</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <button 
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 sm:hover:scale-105 transform"
              onClick={() => setShowEventsModal(true)}
            >
              <span className="text-base sm:text-lg">✨</span> View Debut Events <span className="text-base sm:text-lg">✨</span>
            </button>

            <button 
              className="w-full bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 sm:hover:scale-105 transform"
              onClick={() => setShowPhotoshootsModal(true)}
            >
              <span className="text-base sm:text-lg">📸</span> View Photoshoots <span className="text-base sm:text-lg">📸</span>
            </button>
          </div>

          {/* Decorative footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-light italic">~ Celebrate this special milestone ~</p>
          </div>
        </div>
      </Modal>

      {/* Debut Events */}
      <Modal isOpen={showEventsModal} onClose={() => setShowEventsModal(false)} title="Debut Events" size="lg" overlayZ={45} hasBackground={true} backgroundImage="/assets/G12.jpg">
        <div className="space-y-3 sm:space-y-4 max-h-[65vh] overflow-y-auto pr-2 sm:pr-4">
          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold">👗 Dress Code</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">We'd love for you to join us in semi-formal wear, incorporating the specified color palette. Ladies can choose dresses, skirts, or trousers, while gentlemen are encouraged to wear long-sleeved shirts or polo shirts.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowDressModal(true)}>View Details</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold">🎁 Gift Guide</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Your presence is the greatest gift of all. However, if you are inclined to give a gift, monetary contributions or thoughtful presents will be gratefully appreciated.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowGiftModal(true)}>View Details</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold cursor-pointer" onClick={() => { setShowRosesModal(true) }}>🌹 18 Roses</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Each rose represents a special moment and wish for the debutante's future.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowRosesModal(true)}>View Participants</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold cursor-pointer" onClick={() => { setShowBlessingsModal(true) }}>🙏 18 Blessings</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">A heartfelt ceremony where 18 special people offer blessings and well-wishes.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowBlessingsModal(true)}>View Participants</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold cursor-pointer" onClick={() => { setShowTreasuresModal(true) }}>💎 18 TREASURES</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Eighteen treasures presented to honor the celebrant.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowTreasuresModal(true)}>View Participants</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold cursor-pointer" onClick={() => { setShowCandlesModal(true) }}>🕯️ 18 CANDLES</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Each candle is lit by a person special to the debutante, representing important people in her life.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowCandlesModal(true)}>View Participants</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold cursor-pointer" onClick={() => { setShowScentsModal(true) }}>🌸 18 SCENTS</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Eighteen scents presented to celebrate memories and people.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowScentsModal(true)}>View Participants</button></div>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="text-base sm:text-lg font-bold cursor-pointer" onClick={() => { setShowMakeupModal(true) }}>💄 18 MAKEUP</h3>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Professional makeup artists and stylists celebrating the debutante.</p>
            <div className="mt-2 sm:mt-3"><button className="bg-pink-400 hover:bg-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowMakeupModal(true)}>View Participants</button></div>
          </div>


        </div>
      </Modal>

      {/* 18 Roses Participants (nested modal) */}
      <Modal isOpen={showRosesModal} onClose={() => setShowRosesModal(false)} title="18 Roses Participants" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_1.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2 text-left text-xs sm:text-sm">
          {events.roses.map((r, i) => <li key={i}>{r}</li>)}
        </ol>
        <div className="text-center mt-4 sm:mt-6"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowRosesModal(false)}>Close</button></div>
      </Modal>

      {/* 18 Blessings Participants (nested modal) */}
      <Modal isOpen={showBlessingsModal} onClose={() => setShowBlessingsModal(false)} title="18 Blessings" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_2.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2 text-left text-xs sm:text-sm">
          {events.blessings.map((b, i) => <li key={i}>{b}</li>)}
        </ol>
        <div className="text-center mt-4 sm:mt-6"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowBlessingsModal(false)}>Close</button></div>
      </Modal>

      {/* 18 TREASURES Participants (nested modal) */}
      <Modal isOpen={showTreasuresModal} onClose={() => setShowTreasuresModal(false)} title="18 TREASURES" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_3.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2 text-left text-xs sm:text-sm">
          {events.treasures.map((t, i) => <li key={i}>{t}</li>)}
        </ol>
        <div className="text-center mt-4 sm:mt-6"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowTreasuresModal(false)}>Close</button></div>
      </Modal>

      {/* 18 CANDLES Participants (nested modal) */}
      <Modal isOpen={showCandlesModal} onClose={() => setShowCandlesModal(false)} title="18 CANDLES" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_4.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2 text-left text-xs sm:text-sm">
          {events.candles.map((c, i) => <li key={i}>{c}</li>)}
        </ol>
        <div className="text-center mt-4 sm:mt-6"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowCandlesModal(false)}>Close</button></div>
      </Modal>

      {/* 18 SCENTS Participants (nested modal) */}
      <Modal isOpen={showScentsModal} onClose={() => setShowScentsModal(false)} title="18 SCENTS" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_5.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2 text-left text-xs sm:text-sm">
          {events.scents.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <div className="text-center mt-4 sm:mt-6"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowScentsModal(false)}>Close</button></div>
      </Modal>

      {/* 18 MAKEUP Participants (nested modal) */}
      <Modal isOpen={showMakeupModal} onClose={() => setShowMakeupModal(false)} title="18 MAKEUP" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_6.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2 text-left text-xs sm:text-sm">
          {events.makeup.map((m, i) => <li key={i}>{m}</li>)}
        </ol>
        <div className="text-center mt-4 sm:mt-6"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowMakeupModal(false)}>Close</button></div>
      </Modal>

      {/* Dress Code Modal */}
      <Modal isOpen={showDressModal} onClose={() => setShowDressModal(false)} title="Dress Code" size="md" overlayZ={55}>
        <div className="space-y-4 sm:space-y-6 text-gray-800">
          {/* Description */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-pink-200">
            <p className="leading-relaxed text-sm sm:text-base">We'd love for you to join us in semi-formal wear, incorporating the specified color palette. Ladies can choose dresses, skirts, or trousers, while gentlemen are encouraged to wear long-sleeved shirts or polo shirts.</p>
          </div>

          {/* Color Palette Section */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-pink-400 to-rose-400 rounded-full"></div>
              <h3 className="font-serif-elegant text-lg sm:text-xl font-bold text-pink-600">Color Palette</h3>
            </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* White */}
              <div className="group flex flex-col items-center transition-transform duration-300 active:scale-95 sm:hover:scale-110">
                <div className="relative mb-2 sm:mb-3">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-pink-300" style={{backgroundColor:'#FFFFFF'}}></span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-pink-400 flex items-center justify-center text-xs font-bold text-pink-600">1</div>
                </div>
                <small className="text-center font-semibold text-gray-700 text-xs sm:text-sm">White</small>
              </div>

              {/* Ivory */}
              <div className="group flex flex-col items-center transition-transform duration-300 active:scale-95 sm:hover:scale-110">
                <div className="relative mb-2 sm:mb-3">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-pink-300" style={{backgroundColor:'#F7F7E8'}}></span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-pink-400 flex items-center justify-center text-xs font-bold text-pink-600">2</div>
                </div>
                <small className="text-center font-semibold text-gray-700 text-xs sm:text-sm">Ivory</small>
              </div>

              {/* Beige */}
              <div className="group flex flex-col items-center transition-transform duration-300 active:scale-95 sm:hover:scale-110">
                <div className="relative mb-2 sm:mb-3">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-pink-300" style={{backgroundColor:'#D8C3A0'}}></span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-pink-400 flex items-center justify-center text-xs font-bold text-pink-600">3</div>
                </div>
                <small className="text-center font-semibold text-gray-700 text-xs sm:text-sm">Beige</small>
              </div>

              {/* Soft Blush */}
              <div className="group flex flex-col items-center transition-transform duration-300 active:scale-95 sm:hover:scale-110">
                <div className="relative mb-2 sm:mb-3">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-pink-200 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-pink-400" style={{backgroundColor:'#F7BFC7'}}></span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-pink-400 flex items-center justify-center text-xs font-bold text-pink-600">4</div>
                </div>
                <small className="text-center font-semibold text-pink-600 text-xs sm:text-sm">Soft Blush</small>
              </div>

              {/* Medium Pink */}
              <div className="group flex flex-col items-center transition-transform duration-300 active:scale-95 sm:hover:scale-110">
                <div className="relative mb-2 sm:mb-3">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-pink-300 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-pink-500" style={{backgroundColor:'#F48FB3'}}></span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-pink-500 flex items-center justify-center text-xs font-bold text-pink-600">5</div>
                </div>
                <small className="text-center font-semibold text-pink-700 text-xs sm:text-sm">Medium Pink</small>
              </div>

              {/* Rose */}
              <div className="group flex flex-col items-center transition-transform duration-300 active:scale-95 sm:hover:scale-110">
                <div className="relative mb-2 sm:mb-3">
                  <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-rose-300 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-rose-500" style={{backgroundColor:'#E56D96'}}></span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-rose-500 flex items-center justify-center text-xs font-bold text-rose-600">6</div>
                </div>
                <small className="text-center font-semibold text-rose-700 text-xs sm:text-sm">Rose</small>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-300"></div>
            <span className="text-pink-400 text-sm">♦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-base sm:text-lg">✨</span>
              <p className="font-serif-elegant font-bold text-purple-700 text-sm sm:text-base">Styling Tips</p>
            </div>
            <ul className="space-y-1 sm:space-y-2">
              <li className="flex gap-2 text-xs sm:text-sm">
                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                <span><strong className="text-pink-700">Ladies:</strong> Choose dresses, skirts, or trousers from the palette</span>
              </li>
              <li className="flex gap-2 text-xs sm:text-sm">
                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                <span><strong className="text-pink-700">Gentlemen:</strong> Wear long-sleeved shirts or polo shirts</span>
              </li>
              <li className="flex gap-2 text-xs sm:text-sm">
                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                <span><strong className="text-pink-700">Style:</strong> Keep it semi-formal; avoid loud prints</span>
              </li>
            </ul>
          </div>

          {/* Close Button */}
          <div className="text-center pt-2">
            <button className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-6 sm:px-8 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 sm:hover:scale-105 transform" onClick={() => setShowDressModal(false)}>Close</button>
          </div>
        </div>
      </Modal>

      {/* Gift Guide Modal (simple) */}
      <Modal isOpen={showGiftModal} onClose={() => setShowGiftModal(false)} title="Gift Guide" size="sm" overlayZ={55}>
        <div className="space-y-3 sm:space-y-4 text-black">
          <p className="text-sm sm:text-base">Your presence is the greatest gift of all. However, if you are inclined to give a gift, monetary contributions or thoughtful presents will be gratefully appreciated.</p>
          <div className="text-center mt-3 sm:mt-4"><button className="bg-pink-400 hover:bg-pink-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" onClick={() => setShowGiftModal(false)}>Close</button></div>
        </div>
      </Modal>

      {/* Photoshoots Modal */}
      <Modal isOpen={showPhotoshootsModal} onClose={() => setShowPhotoshootsModal(false)} title="Photoshoots" size="xl" overlayZ={55} hasBackground={true} backgroundImage="/assets/G12.jpg">
        <div className="space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-lg font-semibold text-pink-900">✨ Celebrate the Moments ✨</p>
            <p className="text-xs sm:text-sm text-gray-700">Beautiful memories captured from the celebration</p>
          </div>
          
          {/* Gallery Grid - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {PHOTOSHOOT_IMAGES.map((photo) => (
              <div 
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-square cursor-pointer"
                onClick={() => {
                  setSelectedImage(photo)
                  setShowImageViewerModal(true)
                }}
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium bg-pink-500 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">View</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="bg-white/80 rounded-lg p-3 sm:p-4 text-center space-y-2">
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">{PHOTOSHOOT_IMAGES.length} photos</span> captured from this special day
            </p>
          </div>

          {/* Close Button */}
          <div className="text-center">
            <button 
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 sm:hover:scale-105" 
              onClick={() => setShowPhotoshootsModal(false)}
            >
              Close Gallery
            </button>
          </div>
        </div>
      </Modal>

      {/* Image Viewer Modal */}
      <Modal isOpen={showImageViewerModal} onClose={() => setShowImageViewerModal(false)} title="Photo Viewer" size="xl" overlayZ={60}>
        <div className="space-y-3 sm:space-y-4 flex flex-col items-center">
          {selectedImage && (
            <>
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-gray-700 text-center font-medium text-sm sm:text-base">{selectedImage.alt}</p>
              
              {/* Navigation buttons */}
              <div className="flex gap-2 sm:gap-4 justify-center w-full flex-wrap">
                <button 
                  className="bg-pink-400 hover:bg-pink-500 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg transition-colors active:scale-95 sm:hover:scale-105"
                  onClick={() => {
                    const currentIndex = PHOTOSHOOT_IMAGES.findIndex(p => p.id === selectedImage.id)
                    const prevIndex = (currentIndex - 1 + PHOTOSHOOT_IMAGES.length) % PHOTOSHOOT_IMAGES.length
                    setSelectedImage(PHOTOSHOOT_IMAGES[prevIndex])
                  }}
                >
                  ← Previous
                </button>
                <button 
                  className="bg-pink-400 hover:bg-pink-500 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg transition-colors active:scale-95 sm:hover:scale-105"
                  onClick={() => {
                    const currentIndex = PHOTOSHOOT_IMAGES.findIndex(p => p.id === selectedImage.id)
                    const nextIndex = (currentIndex + 1) % PHOTOSHOOT_IMAGES.length
                    setSelectedImage(PHOTOSHOOT_IMAGES[nextIndex])
                  }}
                >
                  Next →
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Photo {PHOTOSHOOT_IMAGES.findIndex(p => p.id === selectedImage.id) + 1} of {PHOTOSHOOT_IMAGES.length}
              </p>
            </>
          )}
          
          <div className="text-center w-full">
            <button 
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 sm:px-8 py-2 text-sm sm:text-base rounded-lg font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105" 
              onClick={() => setShowImageViewerModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

