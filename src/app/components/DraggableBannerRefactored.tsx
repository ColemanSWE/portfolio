'use client'

import { DraggableContainer } from '../../components/ui/DraggableContainer'
import { PortfolioButton } from '../../components/ui/PortfolioButton'

export default function DraggableBannerRefactored() {
  return (
    <DraggableContainer
      initialPosition={{ x: 50, y: 500 }}
      className="z-50 glass-morphism-bright"
      style={{
        width: 'min(400px, 90vw)',
        height: 'min(80px, 12vh)',
        fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
        border: '1px solid rgba(0, 255, 255, 0.3)'
      }}
    >
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex-1">
          <div className="font-bold text-xs mb-1 tracking-wider w-full text-cyan-400">
            ★ SPONSORED CONTENT ★
          </div>
          <div className="font-bold text-sm tracking-wide text-white">
            HIRE ME NOW!
          </div>
        </div>
        
        <PortfolioButton 
          href="#contact"
          size="sm"
          variant="primary"
          className="bg-cyan-400/20 border-cyan-400/50 text-white hover:bg-cyan-400/30"
          onClick={(e) => e?.stopPropagation()}
        >
          CLICK ME
        </PortfolioButton>
      </div>
      
      <div className="absolute -top-1 -right-1 glass-morphism w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-white/20 cursor-pointer text-white border border-white/20">
        ×
      </div>
    </DraggableContainer>
  )
} 