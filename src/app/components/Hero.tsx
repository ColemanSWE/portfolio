'use client'

import Image from 'next/image'
import Computer3D from './Computer3D'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform values for different layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const layer1X = useTransform(scrollYProgress, [0, 1], [0, -30])
  const layer2X = useTransform(scrollYProgress, [0, 1], [0, 15])
  const layer3X = useTransform(scrollYProgress, [0, 1], [0, 30])
  const layer1Rotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  const layer2Rotate = useTransform(scrollYProgress, [0, 1], [0, 2])
  const layer3Rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

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
              {/* Background particles/noise layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer3Y,
                  x: layer3X,
                  rotate: layer3Rotate,
                  background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'blur(2px)',
                  opacity: 0.7,
                  zIndex: 1
                }}
              >
                COLEMAN
              </motion.div>
              
              {/* Middle graffiti layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer2Y,
                  x: layer2X,
                  rotate: layer2Rotate,
                  color: '#ff0080',
                  textShadow: '3px 3px 0px #00ff80, -3px -3px 0px #8000ff',
                  filter: 'drop-shadow(0 0 10px #ff0080)',
                  zIndex: 2
                }}
              >
                COLEMAN
              </motion.div>
              
              {/* Front clean layer */}
              <motion.h1
                className="relative text-8xl lg:text-9xl font-black tracking-wider text-white z-10"
                style={{
                  y: layer1Y,
                  x: layer1X,
                  rotate: layer1Rotate,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  zIndex: 3
                }}
              >
                COLEMAN
              </motion.h1>
            </div>

            <div className="relative mb-8">
              {/* Background particles/noise layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer3Y,
                  x: layer3X,
                  rotate: layer3Rotate,
                  background: 'linear-gradient(45deg, #00ff00, #ff0040, #0080ff, #ff8000)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'blur(2px)',
                  opacity: 0.7,
                  zIndex: 1
                }}
              >
                ROSE
              </motion.div>
              
              {/* Middle graffiti layer */}
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer2Y,
                  x: layer2X,
                  rotate: layer2Rotate,
                  color: '#00ff40',
                  textShadow: '3px 3px 0px #ff4000, -3px -3px 0px #4000ff',
                  filter: 'drop-shadow(0 0 10px #00ff40)',
                  zIndex: 2
                }}
              >
                ROSE
              </motion.div>
              
              {/* Front clean layer */}
              <motion.h1
                className="relative text-8xl lg:text-9xl font-black tracking-wider text-white z-10"
                style={{
                  y: layer1Y,
                  x: layer1X,
                  rotate: layer1Rotate,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  zIndex: 3
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