'use client';
import { projects } from '@/components/data/projects';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

function ProjectCard({ project, index }) {
  const accent = index % 2 ? 'text-magenta' : 'text-cyan';
  return (
    <HoverPanel color={index % 2 ? 'magenta' : 'cyan'} className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative overflow-hidden border-b border-edge bg-panel-2 px-6 py-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 project-grid" />
        <div className="relative flex items-start justify-between gap-4">
          <span className={`font-display text-[10px] tracking-[0.18em] ${accent}`}>{project.code}</span>
          {project.dates && <span className="text-right font-primary text-[10px] text-text-dim">{project.dates}</span>}
        </div>
        <div className="relative mt-7 flex items-end justify-between gap-3">
          <div>
            <p className={`font-display text-3xl font-black tracking-tight ${accent}`}>{project.metric}</p>
            <p className="mt-1 font-primary text-[11px] text-text-dim">{project.metricLabel}</p>
          </div>
          <span aria-hidden="true" className={`font-display text-5xl font-black opacity-10 ${accent}`}>0{index + 1}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={`font-primary text-[10px] uppercase tracking-[0.16em] ${accent}`}>{project.subtitle}</p>
        <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-[0.07em] text-text">{project.title}</h3>
        <p className="mt-4 font-primary text-xs leading-relaxed text-text-dim">{project.description}</p>
        <ul className="mt-5 flex-1 space-y-3 border-l border-edge pl-4">
          {project.bullets.map((bullet) => <li key={bullet} className="font-primary text-xs leading-relaxed text-text">{bullet}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-edge pt-5">
          {project.tech.map((tech) => <span key={tech} className="clip-hud-sm border border-edge bg-panel-2 px-2 py-1 font-primary text-[10px] text-text-dim">{tech}</span>)}
        </div>
      </div>
    </HoverPanel>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal><div id="projects-heading"><SectionTag number="04" label="Projects" color="magenta" /></div></Reveal>
        <RevealGroup as="div" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12} delayChildren={0.05}>
          {projects.map((project, index) => <RevealItem key={project.title} scale><ProjectCard project={project} index={index} /></RevealItem>)}
        </RevealGroup>
      </div>
    </section>
  );
}
