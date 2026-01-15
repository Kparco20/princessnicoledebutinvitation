import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal'
import events from '../data/events'

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
              <div className="envelope-text text-center text-white text-lg font-semibold px-6 max-w-xs bg-gradient-to-r from-pink-400/70 to-purple-500/70 rounded-xl backdrop-blur-md shadow-lg border border-white/20">
                Please click envelope to confirm your attendance. Your RSVP will help us finalize the arrangements for the special event.
              </div>
            </div>          </div>
        </div>, document.body
      )}

      <div id="card-container" className={`relative rounded-2xl p-8 md:p-12 text-center border border-pink-400/30 bg-gradient-to-b from-[rgba(200,150,180,0.6)] to-[rgba(240,180,200,0.7)] shadow-[0_25px_80px_rgba(0,0,0,0.5)] ${invitationRevealed ? 'card-revealed' : 'card-hidden'}`}>
        <img src="/assets/image.png" alt="Celebrant" className="absolute inset-0 w-full h-full object-cover rounded-2xl filter brightness-[0.55] saturate-[0.95]" />
        <div className="relative z-10">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-pink-500" viewBox="0 0 100 60" fill="currentColor"><path d="M50 5 L55 25 L70 15 L65 35 L85 25 L75 45 L95 40 L80 55 L20 55 L5 40 L25 45 L15 25 L35 35 L30 15 L45 25 Z" fill="none" stroke="currentColor" strokeWidth="2" /> <circle cx="50" cy="8" r="4" fill="currentColor" /> </svg>
          </div>
          <p className="text-pink-300/80 tracking-[0.3em] uppercase text-sm mb-4 font-light" style={{textShadow: '0 0 10px rgba(247,111,168,0.5)'}}>You are cordially invited to</p>
          <h1 className="font-serif-elegant text-5xl md:text-6xl font-bold text-pink-100 mb-2 drop-shadow-[0_2px_20px_rgba(247,111,168,0.3)]" style={{textShadow: '0 0 20px rgba(247,111,168,0.6)'}}>Princess Nicole Catapang Mendoza</h1>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400/50" />
            <div className="relative"><span className="font-serif-elegant text-7xl md:text-8xl font-bold text-pink-400">18</span><span className="absolute -top-2 -right-6 text-pink-300 text-lg">th</span></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400/50" />
          </div>

          <p className="font-serif-elegant text-3xl italic text-pink-200/90 mb-8" style={{textShadow: '0 0 12px rgba(247,111,168,0.5)'}}>Birthday Debut</p>

          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="text-pink-300 text-sm mb-2" style={{textShadow: '0 0 6px rgba(247,111,168,0.4)'}}>Click Me</div>
              <button aria-label="Open event details" onClick={() => setShowEventModal(true)} className="bg-none border-none p-2">
                <svg className="w-12 h-12 text-pink-400 hover:text-pink-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M2 6l10 7.5L22 6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> <line x1="16" y1="2" x2="16" y2="6"></line> <line x1="8" y1="2" x2="8" y2="6"></line> <line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <p className="text-pink-100/90 text-lg font-light tracking-wide" style={{textShadow: '0 0 8px rgba(255,255,255,0.3)'}}>Friday, January 23, 2026</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /> <polyline points="12,6 12,12 16,14"></polyline></svg>
              <p className="text-pink-100/90 text-lg font-light tracking-wide" style={{textShadow: '0 0 8px rgba(255,255,255,0.3)'}}>5:30 PM</p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <svg className="w-5 h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /> <circle cx="12" cy="10" r="3" /></svg>
              <div className="text-center">
                <p className="text-pink-100 text-lg font-medium" style={{textShadow: '0 0 8px rgba(255,255,255,0.3)'}}>Edgardo's Hotel</p>
                <p className="text-pink-300/90 text-sm font-light" style={{textShadow: '0 0 6px rgba(255,255,255,0.2)'}}>EF Faderon Commercial Building, 4th floor</p>
              </div>
            </div>
          </div>

          <div className="my-8 py-6 border-t border-b border-pink-400/20">
            <p className="font-serif-elegant text-lg italic text-pink-200/80 leading-relaxed px-4" style={{textShadow: '0 0 10px rgba(247,111,168,0.4)'}}>"Join me as I celebrate this milestone and embrace the journey to adulthood. Your presence would make this day truly unforgettable."</p>
          </div>

          <div className="mt-8 flex justify-center">
            <svg className="w-16 h-8 text-pink-400/50" viewBox="0 0 64 32" fill="none"><path d="M0 16 Q16 0 32 16 Q48 32 64 16" stroke="currentColor" strokeWidth="1.5" fill="none" /> <circle cx="32" cy="16" r="3" fill="currentColor" /></svg>
          </div>
        </div>
      </div>

      {/* Modals (refactored) */}
      
      {/* Event details */}
      <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="Event Details" size="md" overlayZ={40} contentClass="bg-gradient-to-b from-[#D896BE] to-[#F5BEC8] border-4 border-pink-300">
        <div className="space-y-4 text-black">
          <p><strong>Date:</strong> Friday, January 23, 2026</p>
          <p><strong>Time:</strong> 5:30 PM</p>
          <p><strong>Venue:</strong> <br /><strong>Edgardo's Hotel</strong><br />123 Elegance Avenue, Manila</p>

          <div className="text-center mt-4">
            <button className="bg-pink-400 text-white px-4 py-2 rounded-md" onClick={() => setShowEventsModal(true)}>✨ View Debut Events ✨</button>
          </div>
        </div>
      </Modal>

      {/* Debut Events */}
      <Modal isOpen={showEventsModal} onClose={() => setShowEventsModal(false)} title="Debut Events" size="lg" overlayZ={45}>
        <div className="space-y-4">
          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3>👗 Dress Code</h3>
            <p>We’d love for you to join us in semi-formal wear, incorporating the specified color palette. Ladies can choose dresses, skirts, or trousers, while gentlemen are encouraged to wear long-sleeved shirts or polo shirts.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowDressModal(true)}>View Details</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3>🎁 Gift Guide</h3>
            <p>Your presence is the greatest gift of all. However, if you are inclined to give a gift, monetary contributions or thoughtful presents will be gratefully appreciated.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowGiftModal(true)}>View Details</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="cursor-pointer" onClick={() => { setShowRosesModal(true) }}>🌹 18 Roses</h3>
            <p>Each rose represents a special moment and wish for the debutante's future.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowRosesModal(true)}>View Participants</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="cursor-pointer" onClick={() => { setShowBlessingsModal(true) }}>🙏 18 Blessings</h3>
            <p>A heartfelt ceremony where 18 special people offer blessings and well-wishes.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowBlessingsModal(true)}>View Participants</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="cursor-pointer" onClick={() => { setShowTreasuresModal(true) }}>💎 18 TREASURES</h3>
            <p>Eighteen treasures presented to honor the celebrant.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowTreasuresModal(true)}>View Participants</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="cursor-pointer" onClick={() => { setShowCandlesModal(true) }}>🕯️ 18 CANDLES</h3>
            <p>Each candle is lit by a person special to the debutante, representing important people in her life.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowCandlesModal(true)}>View Participants</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="cursor-pointer" onClick={() => { setShowScentsModal(true) }}>🌸 18 SCENTS</h3>
            <p>Eighteen scents presented to celebrate memories and people.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowScentsModal(true)}>View Participants</button></div>
          </div>

          <div className="p-4 bg-pink-50 rounded-md border-l-4 border-pink-300">
            <h3 className="cursor-pointer" onClick={() => { setShowMakeupModal(true) }}>💄 18 MAKEUP</h3>
            <p>Professional makeup artists and stylists celebrating the debutante.</p>
            <div className="mt-2"><button className="bg-pink-400 text-white px-3 py-1 rounded" onClick={() => setShowMakeupModal(true)}>View Participants</button></div>
          </div>


        </div>
      </Modal>

      {/* 18 Roses Participants (nested modal) */}
      <Modal isOpen={showRosesModal} onClose={() => setShowRosesModal(false)} title="18 Roses Participants" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_1.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 text-left">
          {events.roses.map((r, i) => <li key={i}>{r}</li>)}
        </ol>
        <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowRosesModal(false)}>Close</button></div>
      </Modal>

      {/* 18 Blessings Participants (nested modal) */}
      <Modal isOpen={showBlessingsModal} onClose={() => setShowBlessingsModal(false)} title="18 Blessings" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_2.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 text-left">
          {events.blessings.map((b, i) => <li key={i}>{b}</li>)}
        </ol>
        <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowBlessingsModal(false)}>Close</button></div>
      </Modal>

      {/* 18 TREASURES Participants (nested modal) */}
      <Modal isOpen={showTreasuresModal} onClose={() => setShowTreasuresModal(false)} title="18 TREASURES" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_3.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 text-left">
          {events.treasures.map((t, i) => <li key={i}>{t}</li>)}
        </ol>
        <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowTreasuresModal(false)}>Close</button></div>
      </Modal>

      {/* 18 CANDLES Participants (nested modal) */}
      <Modal isOpen={showCandlesModal} onClose={() => setShowCandlesModal(false)} title="18 CANDLES" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_4.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 text-left">
          {events.candles.map((c, i) => <li key={i}>{c}</li>)}
        </ol>
        <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowCandlesModal(false)}>Close</button></div>
      </Modal>

      {/* 18 SCENTS Participants (nested modal) */}
      <Modal isOpen={showScentsModal} onClose={() => setShowScentsModal(false)} title="18 SCENTS" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_5.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 text-left">
          {events.scents.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowScentsModal(false)}>Close</button></div>
      </Modal>

      {/* 18 MAKEUP Participants (nested modal) */}
      <Modal isOpen={showMakeupModal} onClose={() => setShowMakeupModal(false)} title="18 MAKEUP" size="md" overlayZ={55} hasBackground={true} backgroundImage="/assets/IMG_6.jpg">
        <ol className="list-decimal list-inside pl-4 space-y-1 text-left">
          {events.makeup.map((m, i) => <li key={i}>{m}</li>)}
        </ol>
        <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowMakeupModal(false)}>Close</button></div>
      </Modal>

      {/* Dress Code Modal */}
      <Modal isOpen={showDressModal} onClose={() => setShowDressModal(false)} title="Dress Code" size="md" overlayZ={55}>
        <div className="space-y-4 text-black">
          <p>We’d love for you to join us in semi-formal wear, incorporating the specified color palette. Ladies can choose dresses, skirts, or trousers, while gentlemen are encouraged to wear long-sleeved shirts or polo shirts.</p>

          <div className="grid grid-cols-5 gap-4 justify-items-center">
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full shadow-sm" style={{backgroundColor:'#D8C3A0'}}></span>
              <small className="mt-2 text-sm text-pink-700">Beige</small>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full shadow-sm" style={{backgroundColor:'#F7F7E8'}}></span>
              <small className="mt-2 text-sm text-pink-700">Ivory</small>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full shadow-sm" style={{backgroundColor:'#F7BFC7'}}></span>
              <small className="mt-2 text-sm text-pink-700">Soft Blush</small>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full shadow-sm" style={{backgroundColor:'#F48FB3'}}></span>
              <small className="mt-2 text-sm text-pink-700">Medium Pink</small>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full shadow-sm" style={{backgroundColor:'#E56D96'}}></span>
              <small className="mt-2 text-sm text-pink-700">Rose</small>
            </div>
          </div>

          <div className="text-sm text-left">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Ladies: dresses, skirts, or trousers in the palette.</li>
              <li>Gentlemen: long-sleeved shirts or polo shirts.</li>
              <li>Keep it semi-formal; avoid loud prints.</li>
            </ul>
          </div>

          <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowDressModal(false)}>Close</button></div>
        </div>
      </Modal>

      {/* Gift Guide Modal (simple) */}
      <Modal isOpen={showGiftModal} onClose={() => setShowGiftModal(false)} title="Gift Guide" size="sm" overlayZ={55}>
        <div className="space-y-4 text-black">
          <p>Your presence is the greatest gift of all. However, if you are inclined to give a gift, monetary contributions or thoughtful presents will be gratefully appreciated.</p>
          <div className="text-center mt-4"><button className="bg-pink-400 text-white px-4 py-1 rounded" onClick={() => setShowGiftModal(false)}>Close</button></div>
        </div>
      </Modal>

    </div>
  )
}

