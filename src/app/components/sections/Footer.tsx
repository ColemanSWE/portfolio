import { daysSinceStart } from '../../../lib/portfolio-data';
import Uptime from '../Uptime';

export default function Footer() {
  return (
    <footer className="gut">
      <span>
        © 2019–{new Date().getFullYear()} Coleman Rose · uptime
        <Uptime initial={daysSinceStart()} /> days
      </span>
      <div className="b88s" aria-hidden="true">
        <div className="b88">
          MADE IN
          <br />
          HELSINKI
        </div>
        <div className="b88 h">
          WEBGL
          <br />
          INSIDE
        </div>
        <div className="b88">
          LULU
          <br />
          APPROVED
        </div>
      </div>
    </footer>
  );
}
