import Hero from './components/Hero'
import About from './components/About'
import ExperienceServer from './components/ExperienceServer'
import Skills from './components/Skills'
import ProjectsServer from './components/ProjectsServer'
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
        <ExperienceServer />
        <Skills />
        <ProjectsServer />
        <Contact />
      </main>
    </>
  )
} 