import Image from 'next/image';
import { person } from '../../../lib/portfolio-data';

const PORTRAIT = '/textures/erosion-portrait.jpg';

// The WebGL layer paints this section from scratch (portrait, name, CRT, bubbles) and dissolves it on
// scroll. `.hero-flat` is the same composition in plain HTML for no-WebGL visitors and search engines.
export default function Hero() {
  return (
    <section className="hero" id="hero" data-fx-hero={PORTRAIT}>
      <div className="hero-flat">
        <Image className="portrait" src={PORTRAIT} alt="" width={1280} height={720} priority />
        <h1>
          COLEMAN
          <br />
          ROSE
          <span className="sr">
            , {person.role} in {person.location}
          </span>
        </h1>
      </div>
      <div className="meta lbl">
        {person.role}
        <br />
        {person.location}
        <br />
        online since 2019
      </div>
      <a className="down" href="#statement" aria-label="Scroll down">
        ↓
      </a>
    </section>
  );
}
