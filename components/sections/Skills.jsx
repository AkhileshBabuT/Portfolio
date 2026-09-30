'use client';
import { FaAws, FaJava } from 'react-icons/fa';
import {
  SiApachekafka, SiCouchbase, SiDocker, SiDotnet, SiGitlab, SiGnubash,
  SiJavascript, SiJenkins, SiJest, SiKubernetes, SiLangchain,
  SiMicrosoftazure, SiMongodb, SiNextdotjs, SiPostgresql, SiPowershell,
  SiPrisma, SiPython, SiReact, SiRedhatopenshift, SiRedis, SiSelenium,
  SiSonarqube, SiSpringboot, SiSupabase, SiTypescript,
} from 'react-icons/si';
import { skillGroups } from '@/components/data/skills';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

const skillIcons = {
  AWS: FaAws,
  Azure: SiMicrosoftazure,
  GitLab: SiGitlab,
  Jenkins: SiJenkins,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  OpenShift: SiRedhatopenshift,
  'Apache Kafka': SiApachekafka,
  Python: SiPython,
  Java: FaJava,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Bash: SiGnubash,
  PowerShell: SiPowershell,
  '.NET': SiDotnet,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  MongoDB: SiMongodb,
  Couchbase: SiCouchbase,
  Redis: SiRedis,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Spring Boot': SiSpringboot,
  Prisma: SiPrisma,
  LangChain: SiLangchain,
  SonarQube: SiSonarqube,
  Jest: SiJest,
  Selenium: SiSelenium,
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal><div id="skills-heading"><SectionTag number="02" label="Skills Arsenal" color="magenta" /></div></Reveal>
        <RevealGroup as="div" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08} delayChildren={0.05}>
          {skillGroups.map((group, index) => (
            <RevealItem key={group.code} scale>
              <HoverPanel color={index % 2 ? 'magenta' : 'cyan'} className="h-full p-6">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-edge pb-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.12em] text-text">{group.category}</h3>
                  <span className="shrink-0 font-primary text-[10px] text-cyan/70">{group.code}</span>
                </div>
                <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4" aria-label={`${group.category} technologies`}>
                  {group.technologies.map((name) => {
                    const Icon = skillIcons[name];
                    return (
                      <li key={name} className="group flex min-w-0 flex-col items-center gap-2 text-center">
                        <span className="clip-hud-sm flex h-14 w-full items-center justify-center border border-edge bg-panel-2 text-2xl text-text transition-all duration-200 group-hover:border-cyan group-hover:text-cyan group-hover:shadow-glow-cyan">
                          <Icon aria-hidden="true" />
                        </span>
                        <span className="font-primary text-[10px] leading-tight text-text-dim">{name}</span>
                      </li>
                    );
                  })}
                </ul>
              </HoverPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
