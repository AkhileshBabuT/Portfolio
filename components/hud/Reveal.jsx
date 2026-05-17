'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { t, stagger as staggerTokens, viewport } from '@/lib/motion';

const OFFSETS = { up: { y: 20 }, down: { y: -20 }, left: { x: 24 }, right: { x: -24 } };

export function Reveal({ children, delay = 0, from = 'up', scale = false, className = '' }) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[from] || OFFSETS.up;
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, ...offset, ...(scale ? { scale: 0.96 } : {}) };
  const shown  = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}) };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={viewport.once}
      transition={{ ...t.reveal, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, stagger = staggerTokens.normal, delayChildren = 0, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport.once}
      variants={{
        hidden: {},
        shown: {
          transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delayChildren },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, from = 'up', scale = false, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = OFFSETS[from] || OFFSETS.up;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset, ...(scale ? { scale: 0.96 } : {}) },
        shown: {
          opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}),
          transition: t.reveal,
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
