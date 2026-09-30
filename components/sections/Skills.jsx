'use client';
import { skillGroups } from '@/components/data/skills';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal><div id="skills-heading"><SectionTag number="02" label="Skills Arsenal" color="magenta" /></div></Reveal>
        <p className="mb-8 max-w-2xl font-primary text-sm leading-relaxed text-text-dim">
          The tools behind the missions: cloud systems, release engineering, secure data, and AI-powered products.
        </p>
        <RevealGroup as="div" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08} delayChildren={0.05}>
          {skillGroups.map((group, index) => (
            <RevealItem key={group.code} scale>
              <HoverPanel color={index % 2 ? 'magenta' : 'cyan'} className="h-full p-6">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-edge pb-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.12em] text-text">{group.category}</h3>
                  <span className="shrink-0 font-primary text-[10px] text-cyan/70">{group.code}</span>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <li key={skill} className="clip-hud-sm border border-edge bg-panel-2 px-2.5 py-1.5 font-primary text-[11px] leading-snug text-text-dim transition-colors hover:border-cyan/50 hover:text-cyan">
                      {skill}
                    </li>
                  ))}
                </ul>
              </HoverPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
