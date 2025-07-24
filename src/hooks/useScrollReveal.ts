'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  once?: boolean
}

// Simplified scroll reveal that's much lighter
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px 100px 0px', // Reduced for better performance
    delay = 0,
    once = true
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Use requestIdleCallback for better performance if available
    const scheduleCallback = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback)
      } else {
        setTimeout(callback, delay)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleCallback(() => setIsVisible(true))
          
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, delay, once])

  return { ref, isVisible }
}

// Disabled parallax for performance - just returns static values
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const offset = 0 // Static - no scroll calculations

  return { ref, offset }
}

// Optimized staggered reveal with reduced complexity
export function useStaggeredReveal(itemCount: number, staggerDelay: number = 50) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false))
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Batch update all items at once for better performance
          requestAnimationFrame(() => {
            const newArray = new Array(itemCount).fill(true)
            setVisibleItems(newArray)
          })
          observer.unobserve(container)
        }
      },
      {
        threshold: 0.05, // Lower threshold for faster triggers
        rootMargin: '0px 0px 50px 0px', // Reduced margin
      }
    )

    observer.observe(container)

    return () => observer.unobserve(container)
  }, [itemCount, staggerDelay])

  return { containerRef, visibleItems }
} 