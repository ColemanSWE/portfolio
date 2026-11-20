import TopBar from './components/sections/TopBar';
import Hero from './components/sections/Hero';
import Statement from './components/sections/Statement';
import Marquee from './components/sections/Marquee';
import GameFeature from './components/sections/GameFeature';
import Lab from './components/sections/Lab';
import Boxes from './components/sections/Boxes';
import Footer from './components/sections/Footer';
import FxLayer from './components/FxLayer';
import HoloCursor from './components/HoloCursor';

// Years of experience and the uptime counter are computed on the server; re-render daily.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <FxLayer />
      <HoloCursor />
      <TopBar />
      <main>
        <Hero />
        <Statement />
        <Marquee />
        <GameFeature />
        <Lab />
        <Boxes />
      </main>
      <Footer />
    </>
  );
}
