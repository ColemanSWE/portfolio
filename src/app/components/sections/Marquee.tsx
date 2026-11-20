import { yearsOfExperience } from '../../../lib/portfolio-data';

export default function Marquee() {
  const sep = '  ·  ';
  return (
    <div className="marquee" aria-hidden="true">
      <span>
        NOW <i>→</i> VFX pipeline tools at 255 PIX Studio{sep}
        <b>{yearsOfExperience()}</b> years of shipping software{sep}Python · TypeScript · Nuke · Resolve · WebGL
        {sep}Absolution Engine coming to Steam{sep}open to interesting work{sep}Lulu says hi
      </span>
    </div>
  );
}
