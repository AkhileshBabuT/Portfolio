'use client';
import { FiArrowDown, FiMapPin } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { statBars } from '@/components/data/statbars';
import { FramePanel } from '@/components/hud/FramePanel';
import { StatBar } from '@/components/hud/StatBar';
import { TypedText } from '@/components/hud/TypedText';
import { NeonButton } from '@/components/hud/NeonButton';
import { Reveal } from '@/components/hud/Reveal';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative flex min-h-screen items-center px-6 py-28"
    >
      <div className="container mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <Reveal from="right">
          <p className="mb-3 font-display text-xs tracking-[0.35em] text-magenta">
            {'// PLAYER_CARD — 00'}
          </p>
          <h1
            id="hero-name"
            className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            Akhilesh Babu<br />
            <span className="text-cyan text-glow-cyan">Tumati</span>
          </h1>
          <p className="mt-4 font-display text-lg tracking-[0.15em] text-text-dim">
            {profile.title}
          </p>
          <p className="mt-2 flex items-center gap-2 font-primary text-sm text-text-dim">
            <FiMapPin className="text-cyan" /> {profile.location}
          </p>
          <p className="mt-6 min-h-[1.5rem] font-primary text-base text-cyan">
            <TypedText phrases={profile.taglines} />
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <NeonButton href="#projects">View Projects</NeonButton>
            <NeonButton href="#connect" color="magenta">Connect</NeonButton>
          </div>
        </Reveal>

        <Reveal from="left" delay={0.15}>
          <FramePanel className="p-6">
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
          </FramePanel>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan"
      >
        <FiArrowDown className="animate-bounce text-xl" />
      </a>
    </section>
  );
}
