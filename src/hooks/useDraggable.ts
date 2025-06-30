'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Position {
  x: number
  y: number
}

interface UseDraggableOptions {
  initialPosition?: Position
  bounds?: {
    left?: number
    top?: number
    right?: number
    bottom?: number
  }
  constrainToViewport?: boolean
  disabled?: boolean
}

export function useDraggable(options: UseDraggableOptions = {}) {
  const {
    initialPosition = { x: 50, y: 100 },
    bounds,
    constrainToViewport = true,
    disabled = false
  } = options

  const [position, setPosition] = useState<Position>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (constrainToViewport && typeof window !== 'undefined') {
      const element = elementRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const safeX = Math.max(10, Math.min(initialPosition.x, window.innerWidth - rect.width - 10))
      const safeY = Math.max(10, Math.min(initialPosition.y, window.innerHeight - rect.height - 10))
      
      setPosition({ x: safeX, y: safeY })
    }
  }, [initialPosition.x, initialPosition.y, constrainToViewport])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || disabled) return

    const element = elementRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    let newX = e.clientX - dragOffset.x
    let newY = e.clientY - dragOffset.y + window.scrollY

    if (bounds) {
      if (bounds.left !== undefined) newX = Math.max(bounds.left, newX)
      if (bounds.top !== undefined) newY = Math.max(bounds.top, newY)
      if (bounds.right !== undefined) newX = Math.min(bounds.right - rect.width, newX)
      if (bounds.bottom !== undefined) newY = Math.min(bounds.bottom - rect.height, newY)
    }

    if (constrainToViewport) {
      newX = Math.max(10, Math.min(newX, window.innerWidth - rect.width - 10))
      newY = Math.max(10, newY)
    }

    setPosition({ x: newX, y: newY })
  }, [isDragging, disabled, dragOffset, bounds, constrainToViewport])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return

    const element = elementRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsDragging(true)
  }, [disabled])

  return {
    position,
    isDragging,
    elementRef,
    handleMouseDown,
    setPosition
  }
} 