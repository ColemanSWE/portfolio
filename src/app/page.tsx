import { Suspense, lazy } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'

// Only lazy load truly heavy components that impact initial bundle
const ExperienceServer = lazy(() => import('./components/ExperienceServer'))
const ProjectsServer = lazy(() => import('./components/ProjectsServer'))

// Keep utility components regular imports for better dev performance
import Ticker from './components/Ticker'
import DraggableBanner from './components/DraggableBanner'
import Minimap from './components/Minimap'
import CatAdBanner from './components/CatAdBanner'

// Simplified loading component
const SectionLoader = () => (
  <div className="py-20 px-4 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export default function Home() {
  return (
    <>
      <Ticker />
      <div className="hidden lg:block">
        <DraggableBanner />
      </div>
      <div className="hidden lg:block">
        <CatAdBanner />
      </div>
      <div className="hidden lg:block">
        <Minimap />
      </div>
      
      <main>
        <Hero />
        <About />
        
        <Suspense fallback={<SectionLoader />}>
          <ExperienceServer />
        </Suspense>
        
        <Skills />
        
        <Suspense fallback={<SectionLoader />}>
          <ProjectsServer />
        </Suspense>
        
        <Contact />
      </main>
    </>
  )
} 