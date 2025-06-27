import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Ticker from './components/Ticker'
import LoadingScreen from './components/LoadingScreen'
import DraggableBanner from './components/DraggableBanner'
import AchievementNotification from './components/AchievementNotification'
import Minimap from './components/Minimap'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Ticker />
      <DraggableBanner />
      <AchievementNotification />
      <Minimap />
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