'use client'

import { useState, useEffect } from 'react'

interface Section {
  id: string
  name: string
  color: string
  progress: number
}

export default function Minimap() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  const sections: Section[] = [
    { id: 'hero', name: 'SPAWN', color: 'bg-yellow-400', progress: 0 },
    { id: 'about', name: 'ABOUT', color: 'bg-purple-400', progress: 0 },
    { id: 'experience', name: 'WORK', color: 'bg-green-400', progress: 0 },
    { id: 'skills', name: 'SKILLS', color: 'bg-red-400', progress: 0 },
    { id: 'projects', name: 'PROJECTS', color: 'bg-blue-400', progress: 0 },
    { id: 'contact', name: 'COMM', color: 'bg-pink-400', progress: 0 }
  ]

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = Math.min((scrollTop / docHeight) * 100, 100)

          setScrollProgress(progress)

          // Simplified section detection
          let current = 'hero'
          if (progress > 80) current = 'contact'
          else if (progress > 65) current = 'projects'
          else if (progress > 50) current = 'skills'
          else if (progress > 35) current = 'experience'
          else if (progress > 20) current = 'about'

          setCurrentSection(current)
          ticking = false
        })
        ticking = true
      }
    }

    // Throttled scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-morphism-bright p-4 w-52 border border-white/20">
        <div className="flex items-center justify-between mb-3">
          <div className="text-cyan-400 font-bold text-sm tracking-wider">
            MINIMAP
          </div>
          <div className="text-cyan-400 text-sm">
            {Math.round(scrollProgress)}%
          </div>
        </div>

        <div className="glass-morphism bg-gray-800/50 h-2 mb-4 relative border border-white/10">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full transition-all duration-300 rounded-sm"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center gap-3 text-sm cursor-pointer hover:bg-white/10 p-2 rounded transition-colors ${
                currentSection === section.id ? 'bg-white/5' : ''
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              <div 
                className={`w-3 h-3 rounded-sm border border-white/30 ${section.color} ${
                  currentSection === section.id ? 'animate-pulse' : ''
                }`}
              />
              <span className={`font-bold tracking-wide ${
                currentSection === section.id ? 'text-white' : 'text-gray-300'
              }`}>
                {section.name}
              </span>
              {currentSection === section.id && (
                <span className="text-cyan-400 ml-auto">●</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-between text-sm text-cyan-400">
            <span>ENEMIES: 0</span>
            <span>PING: 12ms</span>
          </div>
        </div>
      </div>
    </div>
  )
} 