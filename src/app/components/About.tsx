'use client'

import { useStaggeredReveal } from '../../hooks/useScrollReveal'
import { PortfolioCard, PortfolioGrid, Section } from '../../components/ui/PortfolioCard'

export default function About() {
  const { containerRef, visibleItems } = useStaggeredReveal(2, 300)

  return (
    <Section id="about" title="SYSTEM OPERATOR" bgColor="rainbow-subtle">
      <div 
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto"
      >
        <PortfolioGrid maxWidth="6xl">
          <PortfolioCard 
            className={`scroll-reveal ${visibleItems[0] ? 'revealed' : ''}`}
          >
            <div className="space-y-6">
              <div className="text-xl font-bold tracking-wide text-white leading-relaxed">
                SENIOR SOFTWARE ENGINEER WITH EXTENSIVE EXPERIENCE IN FULL-STACK DEVELOPMENT. 
                SPECIALIST IN REACT, TYPESCRIPT, AND NODE.JS ARCHITECTURES.
              </div>
              <div className="text-lg font-bold tracking-wide text-gray-300 leading-relaxed">
                ARCHITECT OF SCALABLE SYSTEMS. BUILDER OF DIGITAL INFRASTRUCTURE. 
                SOLVER OF COMPLEX PROBLEMS.
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="glass-morphism px-4 py-2 text-sm font-bold text-cyan-400 border border-cyan-400/30">
                  PROBLEM SOLVER
                </div>
                <div className="glass-morphism px-4 py-2 text-sm font-bold text-pink-400 border border-pink-400/30">
                  SYSTEM ARCHITECT
                </div>
                <div className="glass-morphism px-4 py-2 text-sm font-bold text-yellow-400 border border-yellow-400/30">
                  INNOVATION DRIVER
                </div>
              </div>
            </div>
          </PortfolioCard>
          
          <PortfolioCard 
            className={`scroll-reveal ${visibleItems[1] ? 'revealed' : ''}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  5+
                </div>
                <div className="font-bold tracking-wide text-white">YEARS EXP</div>
                <div className="text-sm text-gray-400 mt-1">PROFESSIONAL</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <div className="font-bold tracking-wide text-white">PROJECTS</div>
                <div className="text-sm text-gray-400 mt-1">COMPLETED</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="font-bold tracking-wide text-white">AVAILABILITY</div>
                <div className="text-sm text-gray-400 mt-1">DEDICATED</div>
              </div>
            </div>
          </PortfolioCard>
        </PortfolioGrid>
      </div>
    </Section>
  )
} 