'use client'

import { ReactNode } from 'react'
import { useDraggable } from '../../hooks/useDraggable'

interface DraggableContainerProps {
  children: ReactNode
  initialPosition?: { x: number; y: number }
  className?: string
  style?: React.CSSProperties
  bounds?: {
    left?: number
    top?: number
    right?: number
    bottom?: number
  }
  constrainToViewport?: boolean
  disabled?: boolean
}

export function DraggableContainer({
  children,
  initialPosition,
  className = '',
  style = {},
  bounds,
  constrainToViewport = true,
  disabled = false
}: DraggableContainerProps) {
  const { position, isDragging, elementRef, handleMouseDown } = useDraggable({
    initialPosition,
    bounds,
    constrainToViewport,
    disabled
  })

  return (
    <div
      ref={elementRef}
      className={`absolute ${isDragging ? 'cursor-grabbing' : 'cursor-move'} select-none ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        ...style
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
} 