'use client';
import { FiExternalLink, FiFileText } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';

export default function Publications() {
  return (
    <section id="publications" aria-labelledby="publications-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="publications-heading">
            <SectionTag number="05" label="Research" color="magenta" />
          </div>
        </Reveal>

        <RevealGroup
          as="div"
          className="flex flex-col gap-5"
          stagger={0.1}
          delayChildren={0.05}
        >
          {profile.publications.map((pub, i) => (
            <RevealItem key={i} scale>
              <HoverPanel color={i % 2 === 0 ? 'cyan' : 'magenta'} className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  {/* Index */}
                  <span className="font-display text-2xl font-black text-edge select-none shrink-0 leading-none mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Venue badge */}
                    <p className="mb-3 font-display text-[10px] tracking-[0.28em] text-cyan">
                      {pub.venue}
                    </p>

                    {/* Citation */}
                    <div className="flex items-start gap-2.5">
                      <FiFileText className="mt-0.5 shrink-0 text-text-dim" aria-hidden="true" />
                      <p className="font-primary text-sm leading-relaxed text-text">
                        {pub.citation}
                      </p>
                    </div>

                    {/* Link */}
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 font-display text-[10px] tracking-[0.2em] text-cyan hover:text-cyan/70 transition-colors duration-200 group"
                    >
                      <FiExternalLink className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      VIEW PAPER
                    </a>
                  </div>
                </div>
              </HoverPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
