'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { experience } from '@/components/data/experience';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

function QuestCard({ job, index }) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.1} className="relative pl-10">
      <motion.span
        aria-hidden="true"
        className="absolute left-2 top-2 h-3 w-3 rotate-45 border-2 border-cyan bg-void shadow-glow-cyan"
        initial={reduce ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <HoverPanel className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-cyan">
            {job.role}
          </h3>
          <span className="font-display text-sm tracking-[0.15em] text-magenta">
            {job.company}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 font-primary text-xs text-text-dim">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="text-cyan" /> {job.dates}
          </span>
          <span className="flex items-center gap-1.5">
            <FiMapPin className="text-cyan" /> {job.location}
          </span>
        </div>
        <RevealGroup as="ul" stagger={0.07} delayChildren={0.15} className="mt-4 space-y-2">
          {job.bullets.map((bullet, i) => (
            <RevealItem key={i} as="li" from="left" className="flex gap-2.5 font-primary text-sm leading-relaxed text-text">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-magenta" />
              <span>{bullet}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </HoverPanel>
    </Reveal>
  );
}

export default function Experience() {
  const reduce = useReducedMotion();
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="experience-heading">
            <SectionTag number="03" label="Mission Log" />
          </div>
        </Reveal>
        <div className="relative space-y-8">
          <motion.span
            aria-hidden="true"
            className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-edge to-transparent"
            style={{ originY: 0 }}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          {experience.map((job, i) => (
            <QuestCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
