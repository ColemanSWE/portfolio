import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Ticker from './components/Ticker'
import LoadingScreen from './components/LoadingScreen'
import DraggableBanner from './components/DraggableBanner'

import Minimap from './components/Minimap'
import CatAdBanner from './components/CatAdBanner'

export default function Home() {
  return (
    <>
      <LoadingScreen />
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
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
} 