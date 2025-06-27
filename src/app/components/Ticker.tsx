'use client'

export default function Ticker() {
  const tickerItems = [
    'NEXT.JS',
    'REACT',
    'TYPESCRIPT',
    'NODE.JS',
    'JEST',
    'CYPRESS',
    'TAILWIND',
    'AWS',
    'SYSTEM DESIGN',
    'GIT',
    'GITHUB',
    'THREE.JS'
  ]

  const tickerText = tickerItems.join(' • ')

  return (
    <div className="ticker">
      <div className="ticker-content">
        <span className="ticker-text">{tickerText} • {tickerText} • {tickerText}</span>
      </div>
    </div>
  )
} 