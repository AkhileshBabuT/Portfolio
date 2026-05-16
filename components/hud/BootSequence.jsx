'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/motion';

export function BootSequence() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce || sessionStorage.getItem('hud-booted')) return;
    setVisible(true);
    let raf;
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          sessionStorage.setItem('hud-booted', '1');
          setVisible(false);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot-overlay"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-3%', transition: { duration: 0.55, ease: ease.quartInOut } }}
        >
          {/* Scanline texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)',
            }}
          />
          {/* Corner brackets */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-8 border border-cyan/15" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
            <motion.p
              className="font-display text-[10px] tracking-[0.45em] text-cyan/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {'// HUD SYSTEM INITIALIZING'}
            </motion.p>

            <motion.div
              className="font-display text-2xl font-black uppercase tracking-[0.25em] text-text sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: ease.expoOut }}
            >
              <span className="text-cyan text-glow-cyan">A.T</span>
              <span className="text-magenta">{' // '}</span>
              <span>PORTFOLIO</span>
            </motion.div>

            {/* Progress bar */}
            <div className="relative h-[2px] w-64 overflow-hidden bg-edge">
              <motion.div
                className="absolute inset-y-0 left-0 bg-cyan shadow-glow-cyan"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <motion.p
              className="font-primary text-[10px] tracking-[0.2em] text-text-dim tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              {`LOADING... ${Math.round(progress * 100)}%`}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
