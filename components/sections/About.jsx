'use client';
import Image from 'next/image';
import { profile } from '@/components/data/profile';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div id="about-heading">
            <SectionTag number="01" label="Dossier" />
          </div>
        </Reveal>

        <Reveal delay={0.1} scale>
          <HoverPanel color="cyan" className="p-7 md:p-9">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">

              {/* Photo column */}
              <RevealGroup delayChildren={0.1} stagger={0.08}>
                <RevealItem from="left" className="flex-shrink-0">
                  <div className="relative mx-auto w-44 md:w-52">
                    {/* HUD corner accents */}
                    <span aria-hidden="true" className="pointer-events-none absolute -top-1.5 -left-1.5 h-4 w-4 border-t-2 border-l-2 border-cyan" />
                    <span aria-hidden="true" className="pointer-events-none absolute -top-1.5 -right-1.5 h-4 w-4 border-t-2 border-r-2 border-cyan" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-cyan" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-4 w-4 border-b-2 border-r-2 border-cyan" />
                    <Image
                      src="/Akhil_picture.png"
                      alt="Akhilesh Babu Tumati"
                      width={208}
                      height={260}
                      className="w-full object-cover clip-hud grayscale brightness-90 contrast-110"
                      priority
                    />
                    <div className="mt-2 text-center font-display text-[9px] tracking-[0.3em] text-cyan/70">
                      IDENT // VERIFIED
                    </div>
                  </div>
                </RevealItem>
              </RevealGroup>

              {/* Bio column */}
              <RevealGroup delayChildren={0.2} stagger={0.1} className="flex-1 min-w-0">
                <RevealItem from="up">
                  <p className="font-primary text-base leading-relaxed text-text md:text-lg">
                    {profile.bio}
                  </p>
                </RevealItem>

                <RevealItem from="up">
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Full-Stack', 'AI / ML', 'Cloud & DevOps', 'Research'].map((tag) => (
                      <span
                        key={tag}
                        className="border border-cyan/30 bg-panel-2 px-3 py-1 font-display text-[10px] tracking-[0.2em] text-cyan clip-hud-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </RevealItem>
              </RevealGroup>

            </div>
          </HoverPanel>
        </Reveal>
      </div>
    </section>
  );
}
