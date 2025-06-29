'use client'

import { useState, useEffect, useRef } from 'react'

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
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([])
  const currentTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const unlockedIds = useRef(new Set<string>())
  const isProcessing = useRef(false)

  const showNextAchievement = () => {
    setAchievementQueue(currentQueue => {
      if (currentQueue.length > 0) {
        const nextAchievement = currentQueue[0]
        setActiveAchievement(nextAchievement)
        isProcessing.current = true
        
        // Clear any existing timeout
        if (currentTimeoutRef.current) {
          clearTimeout(currentTimeoutRef.current)
        }
        
        // Set new timeout
        currentTimeoutRef.current = setTimeout(() => {
          setActiveAchievement(null)
          showNextAchievement() // Process next in queue
        }, 5000)
        
        return currentQueue.slice(1) // Remove the first item from queue
      } else {
        // Queue is empty, clear active achievement
        setActiveAchievement(null)
        isProcessing.current = false
        if (currentTimeoutRef.current) {
          clearTimeout(currentTimeoutRef.current)
          currentTimeoutRef.current = null
        }
        return currentQueue
      }
    })
  }

  const unlockAchievement = (id: string) => {
    // Check if already unlocked using ref to avoid race conditions
    if (unlockedIds.current.has(id)) {
      console.log(`Achievement ${id} already unlocked, skipping`)
      return
    }
    
    console.log(`Unlocking achievement: ${id}`)
    // Immediately mark as unlocked to prevent any race conditions
    unlockedIds.current.add(id)
    
    setAchievements(currentAchievements => {
      const achievement = currentAchievements.find(a => a.id === id)
      if (achievement) {
        // Add to queue (check if already in queue to prevent duplicates)
        setAchievementQueue(currentQueue => {
          // Check if this achievement is already in the queue
          const alreadyInQueue = currentQueue.some(a => a.id === achievement.id)
          if (alreadyInQueue) {
            console.log(`Achievement ${achievement.id} already in queue, skipping`)
            return currentQueue // Don't add duplicate
          }
          
          console.log(`Adding ${achievement.id} to queue. Queue length will be: ${currentQueue.length + 1}`)
          
          const newQueue = [...currentQueue, achievement]
          
          // If not currently processing anything, start processing
          if (!isProcessing.current && currentQueue.length === 0) {
            setTimeout(showNextAchievement, 100)
          }
          
          return newQueue
        })
        
        return currentAchievements.map(a => 
          a.id === id ? { ...a, unlocked: true } : a
        )
      }
      return currentAchievements
    })
  }

  useEffect(() => {
    // Trigger first achievement on load
    setTimeout(() => {
      unlockAchievement('portfolio-visitor')
    }, 2000)

    let scrollTimeout: NodeJS.Timeout | null = null
    
    const handleScroll = () => {
      // Throttle scroll events to prevent excessive calls
      if (scrollTimeout) return
      
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null
        
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
              unlockAchievement(achievementId)
            }
          }
        })
      }, 50) // Throttle to every 50ms
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [unlockAchievement])



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
        
        {achievementQueue.length > 0 && (
          <div className="absolute top-1 right-1 brutal-border-none-shadow bg-blue-400 px-2 py-1 text-xs font-bold">
            +{achievementQueue.length} more
          </div>
        )}
      </div>
    </div>
  )
} 