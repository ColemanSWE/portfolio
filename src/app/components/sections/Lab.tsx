import Image from 'next/image';
import { archive, erosionStudio, holoShader } from '../../../lib/portfolio-data';

export default function Lab() {
  return (
    <section id="lab">
      <div className="lab-head gut">
        <h2>Lab</h2>
        <div className="lbl dim">Experiments, tools and things that break images on purpose.</div>
      </div>

      <article className="entry-x gut">
        <div className="num lbl">{erosionStudio.num}</div>
        <div className="pair">
          {erosionStudio.images.map((img) => (
            <div key={img.src} className="plane" data-fx-plane={img.src} role="img" aria-label={img.alt}>
              <Image className="fallback" src={img.src} alt="" fill sizes="(max-width: 760px) 100vw, 580px" />
            </div>
          ))}
        </div>
        <div className="txt">
          <div>
            <h3>{erosionStudio.title}</h3>
            <div className="lbl dim">{erosionStudio.meta}</div>
          </div>
          <div>
            <p>{erosionStudio.body}</p>
            <div className="chips">
              {erosionStudio.chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
            <div className="lbl dim">{erosionStudio.tech}</div>
          </div>
        </div>
      </article>

      <article className="entry-x gut">
        <div className="num lbl">{holoShader.num}</div>
        <div
          className="plane specimen"
          data-fx-specimen=""
          role="img"
          aria-label="A torus knot and two bubbles in the holographic thin-film shader"
        />
        <div className="txt">
          <div>
            <h3>{holoShader.title}</h3>
            <div className="lbl dim">{holoShader.meta}</div>
          </div>
          <div>
            {holoShader.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="lbl dim">{holoShader.tech}</div>
          </div>
        </div>
      </article>

      <div className="archive gut">
        <div className="lbl dim">Archive</div>
        {archive.map((a) => (
          <a key={a.href} className="arow" href={a.href} target="_blank" rel="noopener noreferrer">
            <span>{a.title}</span>
            <span>{a.desc}</span>
            <span>{a.tech}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
