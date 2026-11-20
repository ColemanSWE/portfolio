'use client';

import { useEffect } from 'react';

// Drives the holographic foil (--mx / --my in globals.css) from the cursor and the scroll position.
export default function HoloCursor() {
  useEffect(() => {
    const root = document.documentElement;
    let px = 0.5;
    let py = 0.5;
    const update = () => {
      const scroll = window.scrollY / Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty('--mx', px.toFixed(3));
      root.style.setProperty('--my', ((py * 0.6 + scroll * 0.4) % 1).toFixed(3));
    };
    const move = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth;
      py = e.clientY / window.innerHeight;
      update();
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', update);
    };
  }, []);

  return null;
}
