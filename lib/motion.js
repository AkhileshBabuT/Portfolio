/**
 * Unified motion token system. Import from here — never inline magic numbers.
 *
 * Easing reference:
 *   expo-out  — snappy entry (UI panels, reveals)
 *   quart-io  — smooth in-and-out (overlays, header)
 *   spring-snappy — tactile hover/tap
 *   spring-soft   — gentle float
 */

// ─── Easing curves ──────────────────────────────────────────────────────────

export const ease = {
  expoOut:   [0.16, 1, 0.3, 1],      // fast accel → cushioned stop (reveals)
  quartInOut:[0.76, 0, 0.24, 1],     // symmetric, refined (overlays/header)
  quartOut:  [0.25, 1, 0.5, 1],      // smooth decel (hover lifts, transitions)
  linear:    'linear',
};

// Spring configs (for Framer Motion `type: 'spring'` transitions)
export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 28, mass: 0.6 },
  soft:   { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 },
  bouncy: { type: 'spring', stiffness: 300, damping: 18, mass: 0.5 },
};

// ─── Duration scale (seconds) ────────────────────────────────────────────────

export const dur = {
  micro:  0.12,  // button tap, icon micro-interaction
  short:  0.24,  // hover color/border transitions
  medium: 0.42,  // panel lifts, slide-ins
  long:   0.70,  // section reveals, line draws
  xlong:  1.10,  // stat bars, boot sequence steps
};

// ─── Stagger ─────────────────────────────────────────────────────────────────

export const stagger = {
  tight:  0.06,  // dense lists (bullets)
  normal: 0.07,  // standard sibling stagger
  loose:  0.10,  // sparse grids (cards)
};

// ─── Shared transition presets ───────────────────────────────────────────────

export const t = {
  reveal:  { duration: dur.long,   ease: ease.expoOut },
  panel:   { duration: dur.medium, ease: ease.quartOut },
  hover:   { duration: dur.short,  ease: ease.quartOut },
  micro:   { duration: dur.micro,  ...spring.snappy },
  draw:    { duration: 0.8,        ease: ease.expoOut },
  header:  { duration: dur.medium, ease: ease.quartInOut },
  boot:    { duration: dur.xlong,  ease: ease.expoOut },
};

// ─── Reusable variant factories ──────────────────────────────────────────────

/**
 * Slide + fade entry variant pair.
 * @param {{ y?, x?, scale? }} hidden  — initial hidden state offsets
 * @returns {{ hidden, shown }} variant object
 */
export function revealVariants({ y = 24, x = 0, scale = 0.96, reduce = false } = {}) {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y, x, scale },
    shown:  { opacity: 1, y: 0, x: 0, scale: 1, transition: t.reveal },
  };
}

/** Stagger container variants. */
export function staggerVariants({ delay = 0, gap = stagger.normal, reduce = false } = {}) {
  return {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: reduce ? 0 : gap,
        delayChildren:   reduce ? 0 : delay,
      },
    },
  };
}

// ─── Viewport config ─────────────────────────────────────────────────────────

export const viewport = {
  once:    { once: true, amount: 0.15 },
  half:    { once: true, amount: 0.4  },
  eager:   { once: true, amount: 0.05 },
};
