import React, { useEffect } from 'react'
import Invitation from './components/Invitation'

export default function App() {
  useEffect(() => {
    const audio = new Audio('/assets/Taylor Swift - Enchanted (Taylor\'s Version) (Lyric Video).mp3')
    audio.autoplay = true
    audio.loop = true
    audio.volume = 0.5
    audio.play().catch(error => console.log('Autoplay prevented:', error))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8D5C4] via-[#F1D9E8] to-[#F76FA8] flex items-center justify-center p-6">
      <Invitation />
    </div>
  )
}
