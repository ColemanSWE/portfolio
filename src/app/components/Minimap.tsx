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
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrollProgress(progress)

      const mainElement = document.querySelector('main')
      if (!mainElement) return

      const allSections = mainElement.children
      let current = 'hero'

      const heroSection = document.querySelector('.hero-section')
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect()
        if (heroRect.bottom > window.innerHeight / 2) {
          current = 'hero'
          setCurrentSection(current)
          return
        }
      }

      const indexToSectionMap: { [key: number]: string } = {
        0: 'hero',
        1: 'about',
        2: 'experience',
        3: 'skills',
        4: 'projects',
        5: 'contact'
      }
      
      let foundSection = false
      for (let i = 0; i < allSections.length; i++) {
        const section = allSections[i]
        const rect = section.getBoundingClientRect()
        
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = indexToSectionMap[i] || 'hero'
          foundSection = true
          break
        }
      }

      if (!foundSection) {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY
        const bottomThreshold = documentHeight - windowHeight - 100
        
        if (scrollTop >= bottomThreshold || scrollProgress > 90) {
          current = 'contact'
        }
      }

      if (scrollProgress > 90) {
        current = 'contact'
      }

      setCurrentSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const mainElement = document.querySelector('main')
    if (!mainElement) return

    const sectionToIndexMap: { [key: string]: number } = {
      'hero': 0,
      'about': 1,
      'experience': 2,
      'skills': 3,
      'projects': 4,
      'contact': 5
    }
    
    const targetIndex = sectionToIndexMap[sectionId]
    if (targetIndex !== undefined && mainElement.children[targetIndex]) {
      mainElement.children[targetIndex].scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-morphism-bright p-4 w-52 border border-white/20">
        <div className="flex items-center justify-between mb-3">
          <div className="text-cyan-400 font-bold text-xs tracking-wider">
            MINIMAP
          </div>
          <div className="text-cyan-400 text-xs">
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
              className={`flex items-center gap-3 text-xs cursor-pointer hover:bg-white/10 p-2 rounded transition-colors ${
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
          <div className="flex justify-between text-xs text-cyan-400">
            <span>ENEMIES: 0</span>
            <span>PING: 12ms</span>
          </div>
        </div>
      </div>
    </div>
  )
} 