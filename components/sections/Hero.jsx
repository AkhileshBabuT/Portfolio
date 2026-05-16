'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { FiArrowDown, FiMapPin } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { statBars } from '@/components/data/statbars';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { StatBar } from '@/components/hud/StatBar';
import { TypedText } from '@/components/hud/TypedText';
import { NeonButton } from '@/components/hud/NeonButton';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms — map scroll progress [0,1] to y offsets
  const leftYActive = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const rightYActive = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);

  // Static fallback for reduced-motion users
  const staticY = useMotionValue(0);
  const leftY = reduce ? staticY : leftYActive;
  const rightY = reduce ? staticY : rightYActive;

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-name"
      className="relative flex min-h-screen items-center px-6 py-28"
    >
      <div className="container mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        {/* Left column — staggered cascade from right, drifts up on scroll */}
        <motion.div style={{ y: leftY }}>
          <RevealGroup delayChildren={0.05} stagger={0.1}>
            {/* Eyebrow with subtle infinite pulse */}
            <RevealItem from="right">
              <motion.p
                className="mb-3 font-display text-xs tracking-[0.35em] text-magenta"
                animate={reduce ? {} : { opacity: [1, 0.55, 1] }}
                transition={reduce ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {'// PLAYER_CARD — LordJordan02'}
              </motion.p>
            </RevealItem>

            {/* Heading */}
            <RevealItem from="right">
              <h1
                id="hero-name"
                className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl"
              >
                Akhilesh Babu<br />
                <span className="text-cyan text-glow-cyan">Tumati</span>
              </h1>
            </RevealItem>

            {/* Title */}
            <RevealItem from="right">
              <p className="mt-4 font-display text-lg tracking-[0.15em] text-text-dim">
                {profile.title}
              </p>
            </RevealItem>

            {/* Location */}
            <RevealItem from="right">
              <p className="mt-2 flex items-center gap-2 font-primary text-sm text-text-dim">
                <FiMapPin className="text-cyan" /> {profile.location}
              </p>
            </RevealItem>

            {/* Tagline */}
            <RevealItem from="right">
              <p className="mt-6 min-h-[1.5rem] font-primary text-base text-cyan">
                <TypedText phrases={profile.taglines} />
              </p>
            </RevealItem>

            {/* Button row */}
            <RevealItem from="right">
              <div className="mt-8 flex flex-wrap gap-4">
                <NeonButton href="#projects">View Projects</NeonButton>
                <NeonButton href="#connect" color="magenta">Connect</NeonButton>
              </div>
            </RevealItem>
          </RevealGroup>
        </motion.div>

        {/* Right column — CORE_STATS as HoverPanel, drifts slightly down on scroll */}
        <motion.div style={{ y: rightY }}>
          <Reveal from="left" delay={0.15}>
            <HoverPanel color="cyan" className="p-6">
              <div className="mb-5 flex items-center justify-between border-b border-edge pb-3">
                <span className="font-display text-xs tracking-[0.2em] text-cyan">
                  CORE_STATS
                </span>
                <span className="font-display text-xs tracking-[0.2em] text-text-dim">
                  LVL // ENGINEER
                </span>
              </div>
              <div className="space-y-4">
                {statBars.map((stat, i) => (
                  <StatBar key={stat.label} label={stat.label} level={stat.level} delay={i * 0.1} />
                ))}
              </div>
            </HoverPanel>
          </Reveal>
        </motion.div>
      </div>

      {/* Scroll cue — looping y-translation, gated for reduced motion */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan"
      >
        <motion.span
          className="block"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={
            reduce
              ? {}
              : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <FiArrowDown className="text-xl" />
        </motion.span>
      </a>
    </section>
  );
}
