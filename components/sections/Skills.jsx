'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { FaAws, FaJava } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import { skillGroups } from '@/components/data/skills';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

// react-icons used for brands Simple Icons no longer ships (AWS, OpenAI, Java).
const iconComponents = { aws: FaAws, openai: SiOpenai, java: FaJava };

function SkillNode({ name, slug, iconKey, light, proficiency }) {
  const reduce = useReducedMotion();
  const IconComponent = iconKey ? iconComponents[iconKey] : null;
  return (
    <div className="group relative flex flex-col items-center gap-2">
      <motion.div
        className="flex h-16 w-16 items-center justify-center border border-edge bg-panel-2 clip-hud-sm transition-all duration-200 group-hover:border-cyan group-hover:shadow-glow-cyan"
        whileHover={reduce ? {} : { scale: 1.12 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        {IconComponent ? (
          <IconComponent size={28} className="text-text" aria-label={`${name} logo`} />
        ) : (
          <img
            src={`https://cdn.simpleicons.org/${slug}${light ? '/e5e7eb' : ''}`}
            alt={`${name} logo`}
            width={28}
            height={28}
            loading="lazy"
          />
        )}
        {/* eslint-enable @next/next/no-img-element */}
      </motion.div>
      <span className="font-primary text-xs text-text-dim">{name}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 z-20 scale-90 whitespace-nowrap border border-cyan/50 bg-void px-2 py-1 font-display text-[10px] uppercase tracking-[0.15em] text-cyan opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        {proficiency}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div id="skills-heading">
            <SectionTag number="02" label="Skills Arsenal" color="magenta" />
          </div>
        </Reveal>
        <RevealGroup
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          delayChildren={0.05}
          as="div"
        >
          {skillGroups.map((group, gi) => (
            <RevealItem key={group.category} scale as="div">
              <HoverPanel color={gi % 2 ? 'magenta' : 'cyan'} className="h-full p-6">
                <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-text">
                  {group.category}
                </h3>
                <div className="grid grid-cols-3 gap-x-2 gap-y-5">
                  {group.skills.map((skill) => (
                    <SkillNode key={skill.name} {...skill} />
                  ))}
                </div>
              </HoverPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
