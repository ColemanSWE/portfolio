'use client'

import Image from 'next/image'
import Computer3D from './Computer3D'
import { PortfolioButton } from '../../components/ui/PortfolioButton'

export default function Hero() {
  

    return (
    <section className="hero-section relative min-h-screen flex items-center">
             <div className="hidden md:block" style={{zIndex: 12, position: 'absolute', top: '10%', left: '50%'}}>
                   <pre style={{
            fontSize: '14px', 
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
             left: '30%',
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
          loading="lazy"
          className="hidden lg:block z-5 absolute opacity-80 pointer-events-none"
          style={{right: '5%', top: '15%',zIndex: 10, maxWidth: '180px'}}
        />
        
        <Image 
          src="/images/esoteric.gif" 
          alt="Esoteric gif" 
          width={400} 
          height={400}
          loading="lazy"
          className="hidden md:block z-5 absolute opacity-80 pointer-events-none" 
          style={{left: '38%', top: '40%',zIndex: 10}}
        />
        
        <Image 
          src="/images/technology-smiley.gif" 
          alt="Technology smiley gif" 
          width={150} 
          height={150}
          loading="lazy"
          className="hidden lg:block z-5  absolute opacity-80 pointer-events-none" 
          style={{right: '15%', bottom: '30%',zIndex: 10, maxWidth: '120px'}}
        />
        
        <Image 
          src="/images/computer.gif" 
          alt="Computer animated gif" 
          width={120} 
          height={90}
          loading="lazy"
          className="hidden md:block z-5 absolute opacity-80 pointer-events-none" 
          style={{left: '10%', bottom: '35%',zIndex: 10, maxWidth: '100px'}}
        />
        
        <Image 
          src="/images/viruswarning.jpg" 
          alt="Virus warning image" 
          width={100} 
          height={100}
          loading="lazy"
          className="hidden xl:block z-5 absolute opacity-80 pointer-events-none" 
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
            <div className="mb-4">
              <h1 
                className="text-5xl md:text-7xl lg:text-9xl font-black tracking-wider text-white"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Corepix, monospace',
                  fontSize: 'clamp(3rem, 8vw, 9rem)'
                }}
              >
                COLEMAN
              </h1>
            </div>

            <div className="mb-8">
              <h1 
                className="text-5xl md:text-7xl lg:text-9xl font-black tracking-wider text-white"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Corepix, monospace',
                  fontSize: 'clamp(3rem, 8vw, 9rem)'
                }}
              >
                ROSE
              </h1>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <div className="glass-morphism-bright px-8 py-4 font-bold text-lg tracking-widest text-white border border-white/20">
                ENGINEERING LEAD
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