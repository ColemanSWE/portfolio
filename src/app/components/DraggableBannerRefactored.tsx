'use client'

import { DraggableContainer } from '../../components/ui/DraggableContainer'
import { PortfolioButton } from '../../components/ui/PortfolioButton'

export default function DraggableBannerRefactored() {
  return (
    <DraggableContainer
      initialPosition={{ x: 50, y: 500 }}
      className="z-50 portfolio-border"
      style={{
        width: 'min(400px, 90vw)',
        height: 'min(80px, 12vh)',
        backgroundColor: 'var(--portfolio-yellow)',
        fontSize: 'clamp(0.7rem, 2vw, 0.9rem)'
      }}
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
        
        <PortfolioButton 
          href="#contact"
          size="sm"
          className="portfolio-border-shadow-none bg-red-400 hover:bg-red-500 transition-colors"
          onClick={(e) => e?.stopPropagation()}
        >
          CLICK ME
        </PortfolioButton>
      </div>
      
      <div className="absolute -top-1 -right-1 portfolio-border-shadow-none bg-white w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer">
        ×
      </div>
    </DraggableContainer>
  )
} 