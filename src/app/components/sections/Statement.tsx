import { yearsOfExperience } from '../../../lib/portfolio-data';

export default function Statement() {
  const years = yearsOfExperience();
  return (
    <section className="statement gut" id="statement">
      <p>
        I&apos;m an engineering lead in Helsinki. For {years} years I&apos;ve built interfaces, the systems behind
        them, and <span className="split">tools that break images on purpose</span>.
      </p>
      <p>
        At 255 PIX Studio I build the tools our VFX artists work in: plugins and scripts for Nuke and DaVinci
        Resolve, and an automation system that ties production tracking to render-farm-style job scheduling. Some
        days it&apos;s 3D pre-production or ComfyUI pipelines instead.
      </p>
      <p>
        After hours I&apos;m making <span className="split">Absolution Engine</span>, a desktop horror game, in
        Godot.
      </p>
    </section>
  );
}
