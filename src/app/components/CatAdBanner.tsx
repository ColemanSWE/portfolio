'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function CatAdBanner() {
  const [position, setPosition] = useState({ x: 50, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getBannerWidth = () => {
      if (window.innerWidth >= 1280) return 600
      if (window.innerWidth >= 1024) return 500
      if (window.innerWidth >= 768) return 384
      return 320
    }
    
    const bannerWidth = getBannerWidth()
    const safeX = Math.min(200, window.innerWidth - bannerWidth - 20)
    if (safeX > 0) {
      setPosition({ x: Math.max(10, safeX), y: 100 })
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const getBannerDimensions = () => {
          if (window.innerWidth >= 1280) return { width: 600, height: 320 }
          if (window.innerWidth >= 1024) return { width: 500, height: 288 }
          if (window.innerWidth >= 768) return { width: 384, height: 224 }
          return { width: 320, height: 192 }
        }
        
        const dimensions = getBannerDimensions()
        const bannerWidth = bannerRef.current?.offsetWidth || dimensions.width
        
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

  return (
    <div
      ref={bannerRef}
      className="absolute z-20 cursor-move select-none w-80 h-48 md:w-96 md:h-56 lg:w-[500px] lg:h-72 xl:w-[600px] xl:h-80"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'white',
        border: '2px solid #0066cc',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.3)'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="h-full p-3 relative">
        <div className="absolute top-1 right-1 w-4 h-4 bg-gray-200 border border-gray-400 flex items-center justify-center text-sm font-bold hover:bg-gray-300 cursor-pointer">
          ×
        </div>
        
        <div className="flex flex-col h-full">
          <div 
            className="text-red-600 font-bold text-sm md:text-base lg:text-lg xl:text-xl mb-1 text-center flex-shrink-0"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            ⭐ LULU&apos;S TESTIMONIAL ⭐
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 lg:gap-4 flex-1 min-h-0">
            <div className="flex flex-row md:flex-col gap-1 md:gap-2 flex-shrink-0">
              <Image 
                src="/lulu/IMG_0790.jpg"
                alt="Lulu the cat"
                width={160}
                height={160}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 object-cover border border-gray-400 shadow-lg"
              />
              <Image 
                src="/lulu/IMG_1215.jpg"
                alt="Lulu the cat"
                width={160}
                height={160}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 object-cover border border-gray-400 shadow-lg"
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-center min-w-0 overflow-hidden">
              <div 
                className="text-blue-800 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight mb-1 md:mb-2"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                &quot;Pappa codes better than he gives belly rubs!<br/>
                He deserves treats... I mean, a job!&quot;<br/>
                <span className="text-red-500 font-bold text-sm md:text-base lg:text-lg xl:text-xl">HIRE HIM NOW - Lulu 🐾</span>
              </div>
              <a 
                href="#contact"
                className="inline-block bg-gradient-to-b from-yellow-300 to-yellow-500 border-2 border-yellow-600 px-2 md:px-3 lg:px-4 xl:px-5 py-1 md:py-1.5 lg:py-2 text-sm md:text-base lg:text-lg xl:text-xl font-bold text-black hover:from-yellow-400 hover:to-yellow-600 transition-all cursor-pointer no-underline self-start"
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
          
          <div className="text-center text-sm lg:text-base text-gray-600 mt-1 flex-shrink-0">
            ★ Endorsed by Professional Cat ★
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500"></div>
      </div>
    </div>
  )
} 