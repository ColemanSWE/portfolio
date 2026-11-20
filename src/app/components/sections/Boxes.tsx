import Image from 'next/image';
import { contact, jobs, testimonial } from '../../../lib/portfolio-data';
import ExperienceTable from '../ExperienceTable';
import CopyEmail from '../CopyEmail';

// The early-web column: experience, Lulu's testimonial and contact, each in a boxed "window".
export default function Boxes() {
  return (
    <div className="column gut">
      <section className="box" id="work">
        <header>
          EXPERIENCE.TXT <small>click a row</small>
        </header>
        <div className="in" style={{ overflowX: 'auto' }}>
          <ExperienceTable jobs={jobs} />
        </div>
      </section>

      <section className="box lulu" id="lulu">
        <header>
          TESTIMONIALS <small>1 of 1</small>
        </header>
        <div className="in">
          {testimonial.photos.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={260} height={260} sizes="(max-width: 760px) 45vw, 130px" />
          ))}
          <blockquote>
            &ldquo;{testimonial.quote}&rdquo;
            <cite>{testimonial.by.toUpperCase()} ★★★★★</cite>
          </blockquote>
        </div>
      </section>

      <section className="box contact" id="contact">
        <header>
          CONTACT <small>replies within a day or two</small>
        </header>
        <div className="in">
          <div>
            <h2>Say hello</h2>
            <p>Open to senior and staff-level engineering roles, contract work and anything involving shaders. Email gets the fastest reply.</p>
            <div className="mail">{contact.email}</div>
            <div className="row">
              <CopyEmail email={contact.email} />
              <a className="btn" href={`mailto:${contact.email}`}>
                Email
              </a>
              <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="globe-wrap">
            <div
              className="globe plane"
              data-fx-globe="/textures/land.png"
              role="img"
              aria-label="A spinning globe with Helsinki marked. Drag to spin it."
            />
            <span>60.17°N 24.94°E</span>
          </div>
        </div>
      </section>
    </div>
  );
}
