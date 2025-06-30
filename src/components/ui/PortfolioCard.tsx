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
  const baseClasses = 'portfolio-card'
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
  bgColor?: 'white' | 'gray-50'
}

export function Section({ 
  id, 
  title, 
  children, 
  className = '', 
  bgColor = 'white' 
}: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 bg-${bgColor} ${className}`}>
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-16">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
} 