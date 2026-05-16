'use client';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '@/components/data/projects';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';
import { NeonButton } from '@/components/hud/NeonButton';

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <FramePanel color={index % 2 ? 'magenta' : 'cyan'} className="flex h-full flex-col p-6">
        <p className="font-display text-[10px] tracking-[0.25em] text-text-dim">
          {`PROJECT — ${String(index + 1).padStart(2, '0')}`}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-[0.1em] text-text">
          {project.title}
        </h3>
        <p className="mt-1 font-primary text-xs text-cyan">{project.subtitle}</p>
        <p className="mt-4 flex-1 font-primary text-sm leading-relaxed text-text-dim">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t.name}
              className="flex items-center gap-1.5 border border-edge bg-panel-2 px-2 py-1 font-primary text-[11px] text-text-dim"
            >
              <img
                src={`https://cdn.simpleicons.org/${t.slug}`}
                alt=""
                width={12}
                height={12}
                loading="lazy"
              />
              {t.name}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <NeonButton href={project.github || undefined} icon={FiGithub} external={!!project.github}>
            Code
          </NeonButton>
          <NeonButton
            href={project.demo || undefined}
            icon={FiExternalLink}
            color="magenta"
            external={!!project.demo}
          >
            Demo
          </NeonButton>
        </div>
      </FramePanel>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div id="projects-heading">
            <SectionTag number="04" label="Projects" color="magenta" />
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
