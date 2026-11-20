import Image from 'next/image';
import { game } from '../../../lib/portfolio-data';

export default function GameFeature() {
  const [main, side] = game.images;
  return (
    <section id="game" className="gut">
      <div className="game">
        <div className="kick">
          <div className="lbl dim">{game.kicker}</div>
          <span className="soon">STEAM PAGE SOON</span>
        </div>
        <h2>{game.title}</h2>
        <div className="stills">
          <div className="plane" data-fx-plane={main.src} role="img" aria-label={main.alt}>
            <Image className="fallback" src={main.src} alt="" fill sizes="(max-width: 760px) 100vw, 680px" />
          </div>
          <div className="plane tall" data-fx-plane={side.src} role="img" aria-label={side.alt}>
            <Image className="fallback" src={side.src} alt="" fill sizes="(max-width: 760px) 100vw, 480px" />
          </div>
        </div>
        <div className="txt">
          <div>
            <div className="lbl dim">{game.genre}</div>
            <div className="stats">
              {game.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>{game.pitch}</p>
            <div className="lbl dim" style={{ marginBottom: 12 }}>
              {game.tech}
            </div>
            <div className="links" aria-label={`${game.title} on social media`}>
              {game.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
