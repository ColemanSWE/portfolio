'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Give the fade animation time to complete before unmounting
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`loading-screen ${!isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
      <div className="flex flex-col items-center justify-center">
        <div className="glitch" data-text="LOADING PORTFOLIO...">
          LOADING PORTFOLIO...
        </div>
        <div className="flex space-x-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-12 bg-white animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 