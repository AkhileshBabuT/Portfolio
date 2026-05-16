'use client';
import { useReducedMotion } from 'framer-motion';

// Fixed full-viewport scanline texture + vignette, plus a slow cyan sweep
// line that travels down the screen. Decorative, non-interactive.
export function ScanlineOverlay() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
          boxShadow: 'inset 0 0 180px rgba(0,0,0,0.9)',
        }}
      />
      {!reduce && (
        <div
          className="absolute inset-x-0 top-0 h-24 animate-scan-sweep"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,229,255,0.06) 60%, rgba(0,229,255,0.12))',
          }}
        />
      )}
    </div>
  );
}
