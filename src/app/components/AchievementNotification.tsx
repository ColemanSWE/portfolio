'use client'

import { useState, useEffect } from 'react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'portfolio-visitor',
    title: 'PORTFOLIO VISITOR',
    description: 'Successfully spawned into the portfolio',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'about-explorer',
    title: 'ABOUT EXPLORER',
    description: 'Discovered the about section',
    icon: '🔍',
    unlocked: false
  },
  {
    id: 'experience-explorer',
    title: 'WORK EXPLORER',
    description: 'Examined the work experience',
    icon: '💼',
    unlocked: false
  },
  {
    id: 'skills-inspector',
    title: 'SKILL INSPECTOR',
    description: 'Analyzed technical skills',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'projects-viewer',
    title: 'PROJECT VIEWER',
    description: 'Reviewed the project portfolio',
    icon: '🚀',
    unlocked: false
  },
  {
    id: 'contact-initiator',
    title: 'CONTACT INITIATOR',
    description: 'Reached the communication zone',
    icon: '📱',
    unlocked: false
  }
]

export default function AchievementNotification() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // Trigger first achievement on load
    setTimeout(() => {
      unlockAchievement('portfolio-visitor')
    }, 2000)

        const handleScroll = () => {
      const mainElement = document.querySelector('main')
      if (!mainElement) return

             const sectionMapping = [
         { index: 1, achievementId: 'about-explorer' },
         { index: 2, achievementId: 'experience-explorer' },
         { index: 3, achievementId: 'skills-inspector' },
         { index: 4, achievementId: 'projects-viewer' },
         { index: 5, achievementId: 'contact-initiator' }
       ]

      sectionMapping.forEach(({ index, achievementId }) => {
        const element = mainElement.children[index]
        if (element) {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          // Check if at least 30% of the section is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
          const sectionHeight = rect.height
          const visibilityRatio = visibleHeight / sectionHeight
          
          if (visibilityRatio > 0.3 && rect.top < windowHeight * 0.8) {
            // Use functional state update to avoid closure issues
            setAchievements(currentAchievements => {
              const achievement = currentAchievements.find(a => a.id === achievementId)
              if (achievement && !achievement.unlocked) {
                unlockAchievement(achievementId)
              }
              return currentAchievements
            })
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const unlockAchievement = (id: string) => {
    const achievement = achievements.find(a => a.id === id)
    if (achievement && !achievement.unlocked) {
      const updatedAchievements = achievements.map(a => 
        a.id === id ? { ...a, unlocked: true } : a
      )
      setAchievements(updatedAchievements)
      setActiveAchievement(achievement)
      
      // Hide achievement after 4 seconds
      setTimeout(() => {
        setActiveAchievement(null)
      }, 4000)
    }
  }

  if (!activeAchievement) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-[slideInRight_0.5s_ease-out]">
      <div className="brutal-border bg-green-400 p-4 w-80 relative">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{activeAchievement.icon}</div>
          <div className="flex-1">
            <div className="font-bold text-xs tracking-wider mb-1 mt-3">
              ACHIEVEMENT UNLOCKED!
            </div>
            <div className="font-bold text-sm tracking-wide mb-1">
              {activeAchievement.title}
            </div>
            <div className="text-xs">
              {activeAchievement.description}
            </div>
          </div>
        </div>
        
        <div className="absolute -top-2 -left-2 brutal-border-none-shadow bg-yellow-400 px-2 py-1 text-xs font-bold">
          +100 XP
        </div>
        
        <div className="absolute bottom-1 right-2 text-xs opacity-70">
          {achievements.filter(a => a.unlocked).length}/{achievements.length}
        </div>
      </div>
    </div>
  )
} 