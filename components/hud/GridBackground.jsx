'use client';
import { useReducedMotion } from 'framer-motion';

// Fixed perspective grid that slowly drifts. Decorative.
export function GridBackground() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      <div
        className={`absolute inset-0 opacity-[0.35] ${reduce ? '' : 'animate-grid-drift'}`}
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
