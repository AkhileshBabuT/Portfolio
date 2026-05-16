'use client';
import { FiAward } from 'react-icons/fi';
import { education } from '@/components/data/education';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="education-heading">
            <SectionTag number="05" label="Education" />
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.1}>
              <FramePanel className="h-full p-6">
                <FiAward className="text-2xl text-cyan" />
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
              </FramePanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
