'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { education } from '@/components/data/education';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

function AwardIcon() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="inline-flex"
      whileHover={reduce ? {} : { rotate: -8, scale: 1.1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <FiAward className="text-2xl text-cyan" />
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="education-heading">
            <SectionTag number="06" label="Education" />
          </div>
        </Reveal>
        <RevealGroup
          as="div"
          className="grid gap-6 md:grid-cols-2"
          stagger={0.12}
          delayChildren={0.05}
        >
          {education.map((edu) => (
            <RevealItem key={edu.school} scale>
              <HoverPanel color="cyan" className="h-full p-6">
                <AwardIcon />
                <h3 className="mt-3 font-display text-base font-bold uppercase tracking-[0.12em] text-text">
                  {edu.school}
                </h3>
                <p className="mt-1 font-primary text-sm text-text-dim">{edu.degree}</p>
                <div className="mt-3 flex items-center justify-between border-t border-edge pt-3">
                  <span className="font-display text-xs tracking-[0.15em] text-magenta">
                    {edu.detail}
                  </span>
                  <span className="font-primary text-xs text-text-dim">{edu.dates}</span>
                </div>
              </HoverPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
