// Lightweight framer-motion stub for development mode
// This eliminates the performance overhead of framer-motion during development

const React = require('react')

// Stub motion components that just render as regular divs
const motion = {
  div: React.forwardRef((props, ref) => {
    const { children, style = {}, className, ...otherProps } = props
    // Extract only the static styles, ignore animation properties
    const staticStyle = {
      ...style,
      // Remove animation-related properties
      y: undefined,
      x: undefined,
      rotate: undefined,
      opacity: style.opacity || 1, // Keep opacity for visibility
    }
    return React.createElement('div', {
      ref,
      className,
      style: staticStyle,
      ...otherProps
    }, children)
  }),
  
  h1: React.forwardRef((props, ref) => {
    const { children, style = {}, className, ...otherProps } = props
    const staticStyle = {
      ...style,
      y: undefined,
      x: undefined,
      rotate: undefined,
      opacity: style.opacity || 1,
    }
    return React.createElement('h1', {
      ref,
      className,
      style: staticStyle,
      ...otherProps
    }, children)
  }),
  
  section: React.forwardRef((props, ref) => {
    const { children, style = {}, className, ...otherProps } = props
    return React.createElement('section', {
      ref,
      className,
      style,
      ...otherProps
    }, children)
  })
}

// Stub hooks that return static values
const useScroll = () => ({
  scrollYProgress: { get: () => 0 }
})

const useTransform = () => 0

const AnimatePresence = ({ children }) => children

module.exports = {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} 