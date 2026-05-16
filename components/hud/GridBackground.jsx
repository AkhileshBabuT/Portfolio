'use client';
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Fixed perspective grid that slowly drifts. Decorative.
// Pauses animation when the tab is hidden to save GPU power.
export function GridBackground() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handler = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const driftClass = reduce
    ? ''
    : paused
    ? 'animate-grid-drift [animation-play-state:paused]'
    : 'animate-grid-drift';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      <div
        className={`absolute inset-0 opacity-[0.35] ${driftClass}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,45,149,0.08), transparent 60%)' }}
      />
    </div>
  );
}
