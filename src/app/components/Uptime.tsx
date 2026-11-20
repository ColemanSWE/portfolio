'use client';

import { useEffect, useState } from 'react';
import { daysSinceStart } from '../../lib/portfolio-data';

// Days since the first dev job. The server renders a value; the client refreshes it to today.
export default function Uptime({ initial }: { initial: number }) {
  const [days, setDays] = useState(initial);
  useEffect(() => setDays(daysSinceStart()), []);

  return (
    <span className="counter" aria-label={`${days} days`}>
      {String(days)
        .padStart(5, '0')
        .split('')
        .map((d, i) => (
          <i key={i} aria-hidden="true">
            {d}
          </i>
        ))}
    </span>
  );
}
