'use client'

import Image from 'next/image'
import Computer3D from './Computer3D'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform values for different layers - they start aligned and separate as you scroll
  const layer1Y = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const layer2Y = useTransform(scrollYProgress, [0, 0.5], [0, -40])
  const layer3Y = useTransform(scrollYProgress, [0, 0.5], [0, 40])
  const layer1X = useTransform(scrollYProgress, [0, 0.5], [0, -20])
  const layer2X = useTransform(scrollYProgress, [0, 0.5], [0, 10])
  const layer3X = useTransform(scrollYProgress, [0, 0.5], [0, 20])
  const layer1Rotate = useTransform(scrollYProgress, [0, 0.5], [0, -3])
  const layer2Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const layer3Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 3])
  
  // Reduce red glow on initial load
  const redGlowOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1])
  
  // Random particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // -50 to 50
    y: Math.random() * 100 - 50,
    size: Math.random() * 4 + 2, // 2 to 6
    delay: Math.random() * 0.5,
  }))
  
  const particleTransforms = particles.map(particle => ({
    x: useTransform(scrollYProgress, [0, 0.5], [0, particle.x]),
    y: useTransform(scrollYProgress, [0, 0.5], [0, particle.y]),
    rotate: useTransform(scrollYProgress, [0, 0.5], [0, Math.random() * 360 - 180]),
  }))

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="container mx-auto px-4">
        
      <Image src="/images/iLoveProgramming.gif" alt="I love programming animated gif" width={200} height={150} style={{position: 'absolute', right: '20%', top: '10%'}} />
      <Image src="/images/technology-smiley.gif" alt="Technology listen gif" width={150} height={150} style={{position: 'absolute', right: '0%', top: '10%'}} />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0">
            <Computer3D />
          </div>
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 3D Layered Name Effect */}
            <div className="relative mb-4">
              {/* Random particles */}
              {particles.map((particle, index) => (
                <motion.div
                  key={particle.id}
                  className="absolute select-none pointer-events-none"
                  style={{
                    x: particleTransforms[index].x,
                    y: particleTransforms[index].y,
                    rotate: particleTransforms[index].rotate,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: Math.random() > 0.5 ? '#ff0000' : '#000000',
                    borderRadius: Math.random() > 0.7 ? '50%' : '0%',
                    opacity: 0.6,
                    zIndex: 0
                  }}
                />
              ))}
              
              {/* Background shadow layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer3Y,
                  x: layer3X,
                  rotate: layer3Rotate,
                  color: '#000000',
                  filter: 'blur(1px)',
                  opacity: 0.8,
                  zIndex: 1,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                COLEMAN
              </motion.div>
              
              {/* Middle red layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer2Y,
                  x: layer2X,
                  rotate: layer2Rotate,
                  color: '#ff0000',
                  textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000',
                  filter: `drop-shadow(0 0 8px #ff0000)`,
                  opacity: redGlowOpacity,
                  zIndex: 2,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                COLEMAN
              </motion.div>
              
              {/* Front white layer */}
              <motion.h1
                className="relative text-8xl lg:text-9xl font-black tracking-wider text-white z-10"
                style={{
                  y: layer1Y,
                  x: layer1X,
                  rotate: layer1Rotate,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  zIndex: 3,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                COLEMAN
              </motion.h1>
            </div>

            <div className="relative mb-8">
              {/* Random particles for ROSE */}
              {particles.map((particle, index) => (
                <motion.div
                  key={`rose-${particle.id}`}
                  className="absolute select-none pointer-events-none"
                  style={{
                    x: particleTransforms[index].x,
                    y: particleTransforms[index].y,
                    rotate: particleTransforms[index].rotate,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: Math.random() > 0.5 ? '#ff0000' : '#000000',
                    borderRadius: Math.random() > 0.7 ? '50%' : '0%',
                    opacity: 0.4,
                    zIndex: 0
                  }}
                />
              ))}
              
              {/* Background shadow layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer3Y,
                  x: layer3X,
                  rotate: layer3Rotate,
                  color: '#000000',
                  filter: 'blur(1px)',
                  opacity: 0.8,
                  zIndex: 1,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                ROSE
              </motion.div>
              
              {/* Middle red layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer2Y,
                  x: layer2X,
                  rotate: layer2Rotate,
                  color: '#ff0000',
                  textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000',
                  filter: `drop-shadow(0 0 8px #ff0000)`,
                  opacity: redGlowOpacity,
                  zIndex: 2,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                ROSE
              </motion.div>
              
              {/* Front white layer */}
              <motion.h1
                className="relative text-8xl lg:text-9xl font-black tracking-wider text-white z-10"
                style={{
                  y: layer1Y,
                  x: layer1X,
                  rotate: layer1Rotate,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  zIndex: 3,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                ROSE
              </motion.h1>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <span className="w-full brutal-border bg-green-400 px-6 py-3 font-bold text-lg tracking-widest">
                SENIOR SOFTWARE ENGINEER
              </span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <a href="#contact" className="brutal-button">
                INITIATE CONTACT
              </a>
              <a href="#projects" className="brutal-button secondary">
                VIEW WORK
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 