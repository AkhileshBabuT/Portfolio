'use client';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { experience } from '@/components/data/experience';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

function QuestCard({ job, index }) {
  return (
    <Reveal delay={index * 0.1} className="relative pl-10">
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 h-3 w-3 rotate-45 border-2 border-cyan bg-void shadow-glow-cyan"
      />
      <FramePanel className="p-6">
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
        <ul className="mt-4 space-y-2">
          {job.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2.5 font-primary text-sm leading-relaxed text-text">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-magenta" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </FramePanel>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="experience-heading">
            <SectionTag number="03" label="Mission Log" />
          </div>
        </Reveal>
        <div className="relative space-y-8">
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-edge to-transparent"
          />
          {experience.map((job, i) => (
            <QuestCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
