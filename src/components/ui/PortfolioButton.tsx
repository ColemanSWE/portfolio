import { ReactNode, MouseEventHandler } from 'react'
import { LucideIcon } from 'lucide-react'

interface PortfolioButtonProps {
  children: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  className?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
}

export function PortfolioButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  target,
  rel,
  type = 'button'
}: PortfolioButtonProps) {
  const baseClasses = 'glass-button'
  const variantClasses = variant === 'secondary' ? 'secondary' : 'primary'
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4'
  }[size]
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`
  
  const content = (
    <>
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {children}
    </>
  )
  
  if (href) {
    return (
      <a
        href={href}
        className={`${buttonClasses} ${Icon ? 'flex items-center gap-2' : ''}`}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }
  
  return (
    <button
      type={type}
      className={`${buttonClasses} ${Icon ? 'flex items-center gap-2' : ''}`}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

interface TechTagProps {
  children: ReactNode
  className?: string
}

export function TechTag({ children, className = '' }: TechTagProps) {
  return (
    <span className={`modern-tech-tag ${className}`}>
      {children}
    </span>
  )
} 