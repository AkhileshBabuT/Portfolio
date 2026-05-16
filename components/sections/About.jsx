'use client';
import { FiFileText } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="about-heading">
            <SectionTag number="01" label="Dossier" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FramePanel className="p-7 md:p-9">
            <p className="font-primary text-base leading-relaxed text-text md:text-lg">
              {profile.bio}
            </p>
            <div className="mt-6 flex items-start gap-3 border-t border-edge pt-5">
              <FiFileText className="mt-0.5 shrink-0 text-magenta" />
              <p className="font-primary text-sm leading-relaxed text-text-dim">
                <span className="font-display text-xs tracking-[0.2em] text-magenta">
                  {'PUBLICATION // '}
                </span>
                {profile.publication}
              </p>
            </div>
          </FramePanel>
        </Reveal>
      </div>
    </section>
  );
}
