'use client'

import { useState, useRef, useEffect } from 'react'

export default function DraggableBanner() {
  const [position, setPosition] = useState({ x: 50, y: 500 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure banner is visible on screen
    const bannerHeight = 80
    const safeY = Math.max(100, Math.min(500, window.innerHeight - bannerHeight - 50))
    setPosition({ x: 50, y: safeY })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const bannerWidth = bannerRef.current?.offsetWidth || Math.min(400, window.innerWidth * 0.9)
        const bannerHeight = bannerRef.current?.offsetHeight || Math.min(80, window.innerHeight * 0.12)
        
        const newX = Math.max(10, Math.min(e.clientX - dragOffset.x, window.innerWidth - bannerWidth - 10))
        const newY = Math.max(10, Math.min(e.clientY - dragOffset.y, window.innerHeight - bannerHeight - 10))
        
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
      className="absolute z-50 brutal-border cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: 'min(400px, 90vw)',
        height: 'min(80px, 12vh)',
        backgroundColor: 'var(--brutal-yellow)',
        fontSize: 'clamp(0.7rem, 2vw, 0.9rem)'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex-1">
                      <div className="font-bold text-xs mb-1 tracking-wider w-full">
              ★ SPONSORED CONTENT ★
            </div>
          <div className="font-bold text-sm tracking-wide">
            HIRE ME NOW!
          </div>
        </div>
        <a 
          href="#contact" 
          className="brutal-border-none-shadow bg-red-400 px-2 py-1 text-xs font-bold hover:bg-red-500 transition-colors cursor-pointer no-underline"
          onClick={(e) => e.stopPropagation()}
        >
          CLICK ME
        </a>
      </div>
      
      <div className="absolute -top-1 -right-1 brutal-border-none-shadow bg-white w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer">
        ×
      </div>
    </div>
  )
} 