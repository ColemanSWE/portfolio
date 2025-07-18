'use client'

import Image from 'next/image'
import Computer3D from './Computer3D'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PortfolioButton } from '../../components/ui/PortfolioButton'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const layer1Y = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const layer2Y = useTransform(scrollYProgress, [0, 0.5], [0, -40])
  const layer3Y = useTransform(scrollYProgress, [0, 0.5], [0, 40])
  const layer1X = useTransform(scrollYProgress, [0, 0.5], [0, -20])
  const layer2X = useTransform(scrollYProgress, [0, 0.5], [0, 10])
  const layer3X = useTransform(scrollYProgress, [0, 0.5], [0, 20])
  const layer1Rotate = useTransform(scrollYProgress, [0, 0.5], [0, -3])
  const layer2Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const layer3Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 3])
  
  const redGlowOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1])
  

    return (
    <section className="hero-section relative min-h-screen flex items-center" ref={containerRef}>
             <div style={{zIndex: 12, position: 'absolute', top: '10%', left: '50%'}}>
         <pre style={{
           fontSize: '8px',
           color: '#00ff00',
           whiteSpace: 'pre',
           textShadow: '0 0 5px rgba(0, 255, 0, 0.8)'
         }}>
{`                       .,,uod8B8bou,,.
               ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
          ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
          !...:!TVBBBRPFT||||||||||!!^^""'   ||||
          !.......:!?|||||!!^^""'            ||||
          !.........||||                     ||||
          !.........||||  ##                 ||||
          !.........||||                     ||||
          !.........||||                     ||||
          !.........||||                     ||||
          !.........||||                     ||||
          \`.........||||                    ,||||
           .;.......||||               _.-!!|||||
    .,uodWBBBBb.....||||       _.-!!|||||||||!:'
 !YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....
 !..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   \`.
`}
         </pre>
        </div>
                 <div 
           className="hidden md:block"
           style={{
             zIndex: 12, 
             position: 'absolute', 
             top: '80%', 
             left: '70%',
             fontFamily: 'Esoterica, serif',
             fontSize: '50px',
             color: 'white',
             textShadow: '0 0 8px rgba(255, 0, 255, 0.8)',
             transform: 'translateX(-50%)'
           }}
         >
             ABCD EF GH IJKL
         </div>
      <div className='absolute inset-0'>
        <Image 
          src="/images/iLoveProgramming.gif" 
          alt="I love programming animated gif" 
          width={200} 
          height={150} 
          className="hidden lg:block z-5 absolute floating-slow opacity-80 pointer-events-none"
          style={{right: '5%', top: '15%',zIndex: 10, maxWidth: '180px'}}
        />
        
        <Image 
          src="/images/esoteric.gif" 
          alt="Esoteric gif" 
          width={400} 
          height={400} 
          className="hidden md:block z-5 absolute floating-medium opacity-80 pointer-events-none" 
          style={{left: '38%', top: '40%',zIndex: 10}}
        />
        
        <Image 
          src="/images/technology-smiley.gif" 
          alt="Technology smiley gif" 
          width={150} 
          height={150} 
          className="hidden lg:block z-5  absolute floating-fast opacity-80 pointer-events-none" 
          style={{right: '15%', bottom: '30%',zIndex: 10, maxWidth: '120px'}}
        />
        
        <Image 
          src="/images/computer.gif" 
          alt="Computer animated gif" 
          width={120} 
          height={90} 
          className="hidden md:block z-5 absolute floating-slow opacity-80 pointer-events-none" 
          style={{left: '10%', bottom: '35%',zIndex: 10, maxWidth: '100px'}}
        />
        
        <Image 
          src="/images/viruswarning.jpg" 
          alt="Virus warning image" 
          width={100} 
          height={100} 
          className="hidden xl:block z-5 absolute floating-medium opacity-80 pointer-events-none" 
          style={{left: '2%', bottom: '5%',zIndex: 10, maxWidth: '200px'}}
        />
      </div>
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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0">
            <Computer3D />
          </div>
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 3D Layered Name Effect with modern gradient */}
            <div className="relative mb-4">
              {/* Background shadow layer */}
              <motion.div
                className="absolute inset-0 text-5xl md:text-7xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer3Y,
                  x: layer3X,
                  rotate: layer3Rotate,
                  color: '#000000',
                  filter: 'blur(2px)',
                  opacity: 0.6,
                  zIndex: 1,
                  fontFamily: 'Corepix, monospace'
                }}
              >
                COLEMAN
              </motion.div>
              
              {/* Middle gradient layer */}
              <motion.div
                className="absolute inset-0 text-5xl md:text-7xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer2Y,
                  x: layer2X,
                  rotate: layer2Rotate,
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff00ff 50%, #00ffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: `drop-shadow(0 0 20px rgba(255, 0, 255, 0.5))`,
                  opacity: redGlowOpacity,
                  zIndex: 2,
                  fontFamily: 'Corepix, monospace'
                }}
              >
                COLEMAN
              </motion.div>
              
              {/* Front white layer */}
              <motion.h1
                className="relative text-5xl md:text-7xl lg:text-9xl font-black tracking-wider text-white z-10"
                style={{
                  y: layer1Y,
                  x: layer1X,
                  rotate: layer1Rotate,
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                  zIndex: 10,
                  fontFamily: 'Corepix, monospace'
                }}
              >
                COLEMAN
              </motion.h1>
            </div>

            <div className="relative mb-8">
              {/* Background shadow layer */}
              <motion.div
                className="absolute inset-0 text-5xl md:text-7xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer3Y,
                  x: layer3X,
                  rotate: layer3Rotate,
                  color: '#000000',
                  filter: 'blur(2px)',
                  opacity: 0.6,
                  zIndex: 1,
                  fontFamily: 'Corepix, monospace'
                }}
              >
                ROSE
              </motion.div>
              
              {/* Middle gradient layer */}
              <motion.div
                className="absolute inset-0 text-5xl md:text-7xl lg:text-9xl font-black tracking-wider select-none pointer-events-none"
                style={{
                  y: layer2Y,
                  x: layer2X,
                  rotate: layer2Rotate,
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff00ff 50%, #00ffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: `drop-shadow(0 0 20px rgba(255, 0, 255, 0.5))`,
                  opacity: redGlowOpacity,
                  zIndex: 2,
                  fontFamily: 'Corepix, monospace'
                }}
              >
                ROSE
              </motion.div>
              
              {/* Front white layer */}
              <motion.h1
                className="relative text-5xl md:text-7xl lg:text-9xl font-black tracking-wider text-white z-10"
                style={{
                  y: layer1Y,
                  x: layer1X,
                  rotate: layer1Rotate,
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                  zIndex: 10,
                  fontFamily: 'Corepix, monospace'
                }}
              >
                ROSE
              </motion.h1>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <div className="glass-morphism-bright px-8 py-4 font-bold text-lg tracking-widest text-white border border-white/20">
                SENIOR SOFTWARE ENGINEER
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <PortfolioButton href="#contact" variant="primary" size="lg">
                INITIATE CONTACT
              </PortfolioButton>
              <PortfolioButton href="#projects" variant="secondary" size="lg">
                VIEW WORK
              </PortfolioButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 