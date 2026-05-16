'use client';
import { motion, useReducedMotion } from 'framer-motion';

const OFFSETS = { up: { y: 32 }, down: { y: -32 }, left: { x: 32 }, right: { x: -32 } };

// Slide + fade in when scrolled into view. `from` picks entry direction.
// Pass `scale` for a subtle zoom-in on entry.
export function Reveal({ children, delay = 0, from = 'up', scale = false, className = '' }) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[from] || OFFSETS.up;
  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, ...offset, ...(scale ? { scale: 0.94 } : {}) };
  const shown = reduce
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}) };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Parent that staggers its RevealItem children as the group scrolls into view.
export function RevealGroup({ children, stagger = 0.1, delayChildren = 0, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
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

// Child of RevealGroup — animates as part of the parent's stagger.
export function RevealItem({ children, from = 'up', scale = false, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = OFFSETS[from] || OFFSETS.up;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduce
          ? { opacity: 0 }
          : { opacity: 0, ...offset, ...(scale ? { scale: 0.94 } : {}) },
        shown: {
          opacity: 1,
          x: 0,
          y: 0,
          ...(scale ? { scale: 1 } : {}),
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
