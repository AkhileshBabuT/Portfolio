'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function AmbientGlitch() {
  const reduce = useReducedMotion();
  const [glitching, setGlitching] = useState(false);
  const glitchY = useRef(40);

  useEffect(() => {
    if (reduce) return;
    let timer;
    const schedule = () => {
      const delay = 8000 + Math.random() * 7000; // 8–15s between glitches
      timer = setTimeout(() => {
        glitchY.current = 20 + Math.random() * 60;
        setGlitching(true);
        setTimeout(() => {
          setGlitching(false);
          schedule(); // reschedule only after glitch completes
        }, 180);
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {glitching && (
        <motion.div
          key="glitch"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.06 }}
        >
          <div
            className="absolute inset-x-0 h-[2px]"
            style={{
              top: `${glitchY.current}%`,
              background: 'rgba(0, 229, 255, 0.4)',
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
            }}
          />
          <div className="absolute inset-0 bg-cyan/[0.015]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
