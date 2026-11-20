'use client';

import { useEffect } from 'react';

// Starts the page's WebGL effects (see src/lib/fx/engine.ts). The engine adds a canvas inside each
// image placeholder, so this component renders nothing itself. three.js loads lazily so the page's HTML
// and fallback images render first.
export default function FxLayer() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import('../../lib/fx/engine').then(({ startFx }) => {
      if (!cancelled) stop = startFx();
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return null;
}
