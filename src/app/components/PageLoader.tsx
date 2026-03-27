'use client'

import { useEffect, useRef, useState } from 'react'

export default function PageLoader() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleLoad() {
      if (barRef.current) {
        barRef.current.style.transition = 'width 0.3s ease-out'
        barRef.current.style.width = '100%'
      }
      setTimeout(() => setFading(true), 350)
      setTimeout(() => setGone(true), 950)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (gone) return null

  return (
    <div className={`page-loader${fading ? ' page-loader--fading' : ''}`} aria-hidden="true">
      <div className="page-loader-content">
        <div className="page-loader-name">COLEMAN ROSE</div>
        <div className="page-loader-track">
          <div className="page-loader-bar" ref={barRef} />
        </div>
        <div className="page-loader-label">LOADING</div>
      </div>
    </div>
  )
}
