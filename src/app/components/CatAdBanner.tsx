'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function CatAdBanner() {
  const [position, setPosition] = useState({ x: 50, y: 800 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set safe initial position on client side
    const bannerWidth = Math.min(500, window.innerWidth * 0.85)
    const safeX = Math.min(200, window.innerWidth - bannerWidth - 20)
    if (safeX > 0) {
      setPosition(prev => ({ ...prev, x: Math.max(10, safeX) }))
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const bannerWidth = bannerRef.current?.offsetWidth || Math.min(500, window.innerWidth * 0.85)
        const bannerHeight = bannerRef.current?.offsetHeight || Math.min(300, window.innerHeight * 0.5)
        
        const newX = Math.max(10, Math.min(e.clientX - dragOffset.x, window.innerWidth - bannerWidth - 10))
        const newY = Math.max(10, e.clientY - dragOffset.y + window.scrollY)
        
        setPosition({
          x: newX,
          y: newY
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = bannerRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
      setIsDragging(true)
    }
  }

  // TODO: Addd duplication/trailing. Reduce z-index for trail etc so it appears behind text

  return (
    <div
      ref={bannerRef}
      className="absolute z-0 cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: 'min(500px, 85vw)',
        height: 'min(300px, 50vh)',
        background: 'white',
        border: '2px solid #0066cc',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="h-full p-3 relative">
        <div className="absolute top-1 right-1 w-4 h-4 bg-gray-200 border border-gray-400 flex items-center justify-center text-xs font-bold hover:bg-gray-300 cursor-pointer">
          ×
        </div>
        
        <div className="flex flex-col h-full">
          <div 
            className="text-red-600 font-bold text-lg md:text-2xl mb-2 md:mb-4 text-center"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            ⭐ LULU&apos;S TESTIMONIAL ⭐
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 flex-1">
            <div className="flex flex-row md:flex-col gap-2 md:gap-4">
              <Image 
                src="/lulu/IMG_0790.jpg"
                alt="Lulu the cat"
                width={160}
                height={160}
                className="w-20 h-20 md:w-40 md:h-40 object-cover border-2 border-gray-400 shadow-lg"
              />
              <Image 
                src="/lulu/IMG_1215.jpg"
                alt="Lulu the cat"
                width={160}
                height={160}
                className="w-20 h-20 md:w-40 md:h-40 object-cover border-2 border-gray-400 shadow-lg"
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div 
                className="text-blue-800 text-sm md:text-lg leading-relaxed mb-3 md:mb-6"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                &quot;Pappa codes better than he gives belly rubs!<br/>
                He deserves treats... I mean, a job!&quot;<br/>
                <span className="text-red-500 font-bold text-base md:text-xl">HIRE HIM NOW - Lulu 🐾</span>
              </div>
              <a 
                href="#contact"
                className="inline-block bg-gradient-to-b from-yellow-300 to-yellow-500 border-2 border-yellow-600 px-4 md:px-8 py-2 md:py-4 text-sm md:text-lg font-bold text-black hover:from-yellow-400 hover:to-yellow-600 transition-all cursor-pointer no-underline self-start"
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  textShadow: '1px 1px 0px rgba(255,255,255,0.8)'
                }}
              >
                HIRE PAPPA! 
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-600 mt-2">
            ★ Endorsed by Professional Cat ★
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500"></div>
      </div>
    </div>
  )
} 