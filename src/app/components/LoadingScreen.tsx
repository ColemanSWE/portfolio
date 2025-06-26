'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="glitch" data-text="DIGITAL EXPERRIENCE ON THE WAY...">
          DIGITAL ADVERTISING ON THE WAY...
        </div>
        <div className="flex space-x-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-12 bg-black animate-pulse"
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