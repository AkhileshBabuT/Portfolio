'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function AmbientGlitch() {
  const reduce = useReducedMotion();
  const [glitching, setGlitching] = useState(false);
  const glitchY = useRef(40);

  const triggerGlitch = useCallback(() => {
    glitchY.current = 20 + Math.random() * 60;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 180);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const schedule = () => {
      const delay = 8000 + Math.random() * 7000;
      return setTimeout(() => { triggerGlitch(); }, delay);
    };
    let timer = schedule();
    const interval = setInterval(() => {
      clearTimeout(timer);
      timer = schedule();
    }, 16000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [reduce, triggerGlitch]);

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
