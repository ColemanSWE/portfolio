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
    'THREE.JS',
  ]

  const tickerText = tickerItems.join(' • ')

  const fullTickerText = `${tickerText} • ${tickerText} • ${tickerText}`

  return (
    <div className="dynamic-ticker">
      <div className="dynamic-ticker-content">
        <span className="dynamic-ticker-text" data-text={fullTickerText}>
          {fullTickerText}
        </span>
      </div>
    </div>
  )
} 