// Lightweight framer-motion stub for development mode
// This eliminates the performance overhead of framer-motion during development

const React = require('react')

// Helper to safely handle style properties to avoid hydration mismatches
const processStyle = (style = {}) => {
  // Keep all properties but convert motion values to static values
  const processedStyle = { ...style }
  
  // Convert motion values to their current static values
  if (style.y && typeof style.y === 'object' && style.y.get) {
    processedStyle.transform = `translateY(${style.y.get()}px)`
    delete processedStyle.y
  } else if (typeof style.y === 'number') {
    processedStyle.transform = `translateY(${style.y}px)`
    delete processedStyle.y
  }
  
  if (style.x && typeof style.x === 'object' && style.x.get) {
    const existing = processedStyle.transform || ''
    processedStyle.transform = `${existing} translateX(${style.x.get()}px)`.trim()
    delete processedStyle.x
  } else if (typeof style.x === 'number') {
    const existing = processedStyle.transform || ''
    processedStyle.transform = `${existing} translateX(${style.x}px)`.trim()
    delete processedStyle.x
  }
  
  if (style.rotate && typeof style.rotate === 'object' && style.rotate.get) {
    const existing = processedStyle.transform || ''
    processedStyle.transform = `${existing} rotate(${style.rotate.get()}deg)`.trim()
    delete processedStyle.rotate
  } else if (typeof style.rotate === 'number') {
    const existing = processedStyle.transform || ''
    processedStyle.transform = `${existing} rotate(${style.rotate}deg)`.trim()
    delete processedStyle.rotate
  }
  
  // Handle opacity motion values
  if (style.opacity && typeof style.opacity === 'object' && style.opacity.get) {
    processedStyle.opacity = style.opacity.get()
  }
  
  return processedStyle
}

// Stub motion components that render as regular elements
const MotionDiv = React.forwardRef((props, ref) => {
  const { children, style, className, ...otherProps } = props
  return React.createElement('div', {
    ref,
    className,
    style: processStyle(style),
    ...otherProps
  }, children)
})
MotionDiv.displayName = 'MotionDiv'

const MotionH1 = React.forwardRef((props, ref) => {
  const { children, style, className, ...otherProps } = props
  return React.createElement('h1', {
    ref,
    className,
    style: processStyle(style),
    ...otherProps
  }, children)
})
MotionH1.displayName = 'MotionH1'

const MotionSection = React.forwardRef((props, ref) => {
  const { children, style, className, ...otherProps } = props
  return React.createElement('section', {
    ref,
    className,
    style: processStyle(style),
    ...otherProps
  }, children)
})
MotionSection.displayName = 'MotionSection'

const motion = {
  div: MotionDiv,
  h1: MotionH1,
  section: MotionSection
}

// Stub hooks that return static motion values with .get() method
const createMotionValue = (value) => ({
  get: () => value,
  set: () => {},
  on: () => () => {},
  destroy: () => {}
})

const useScroll = () => ({
  scrollYProgress: createMotionValue(0)
})

const useTransform = (input, inputRange, outputRange) => {
  // Return a motion value that always returns 0 (static)
  return createMotionValue(0)
}

const AnimatePresence = ({ children }) => children

module.exports = {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} 