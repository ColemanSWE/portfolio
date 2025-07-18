import { ReactNode } from 'react'

interface PortfolioCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'centered'
}

export function PortfolioCard({ 
  children, 
  className = '', 
  variant = 'default' 
}: PortfolioCardProps) {
  const baseClasses = 'glass-card'
  const variantClasses = variant === 'centered' ? 'text-center' : ''
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  )
}

interface PortfolioGridProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl'
}

export function PortfolioGrid({ 
  children, 
  className = '', 
  maxWidth = '6xl' 
}: PortfolioGridProps) {
  const maxWidthClass = `max-w-${maxWidth}`
  
  return (
    <div className={`portfolio-grid ${maxWidthClass} mx-auto ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
  bgColor?: 'transparent' | 'dark' | 'subtle' | 'rainbow-subtle' | 'gradient-dark' | 'rainbow-grid'
}

export function Section({ 
  id, 
  title, 
  children, 
  className = '', 
  bgColor = 'transparent' 
}: SectionProps) {
  const getBgClass = (bgColor: string) => {
    switch (bgColor) {
      case 'dark':
        return 'bg-black/20'
      case 'subtle':
        return 'bg-gradient-to-b from-transparent via-black/5 to-transparent'
      case 'rainbow-subtle':
        return 'bg-gradient-to-br from-cyan-500/3 via-purple-500/2 to-pink-500/3'
      case 'gradient-dark':
        return 'bg-gradient-to-br from-black/40 via-gray-900/30 to-black/40'
      case 'rainbow-grid':
        return 'bg-black'
      default:
        return 'bg-transparent'
    }
  }
  
  const bgClass = getBgClass(bgColor)
  
  if (bgColor === 'rainbow-grid') {
    return (
      <section id={id} className={`py-20 px-4 ${bgClass} ${className} relative`}>
        {/* Rainbow grid background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black"></div>
          
          {/* Cyan grid lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px'
          }}></div>
          
          {/* Purple grid lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px',
            backgroundPosition: '50px 50px'
          }}></div>
          
          {/* Pink grid lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px',
            backgroundPosition: '100px 100px'
          }}></div>
          
          {/* Yellow grid lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 0, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 0, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px',
            backgroundPosition: '150px 150px'
          }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="modern-section-title">
            {title}
          </h2>
          {children}
        </div>
      </section>
    )
  }
  
  return (
    <section id={id} className={`py-20 px-4 ${bgClass} ${className}`}>
      <div className="container mx-auto">
        <h2 className="modern-section-title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
} 