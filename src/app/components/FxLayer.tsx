'use client';

import { useEffect, useRef } from 'react';

// The one fixed WebGL canvas that draws every image on the page (see src/lib/fx/engine.ts).
// three.js is loaded lazily so the page's HTML and fallback images render first.
export default function FxLayer() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import('../../lib/fx/engine').then(({ startFx }) => {
      if (!cancelled && ref.current) stop = startFx(ref.current);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <canvas id="fx" ref={ref} aria-hidden="true" />;
}
