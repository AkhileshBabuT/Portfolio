'use client';
import { FiLinkedin, FiFileText, FiMail, FiBriefcase } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { HoverPanel } from '@/components/hud/HoverPanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal, RevealGroup, RevealItem } from '@/components/hud/Reveal';
import { NeonButton } from '@/components/hud/NeonButton';

export default function Connect() {
  const { links, contact } = profile;
  return (
    <section id="connect" aria-labelledby="connect-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-3xl">
        <Reveal>
          <div id="connect-heading">
            <SectionTag number="07" label="Connect" color="magenta" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <HoverPanel color="magenta" className="p-8 text-center">
            <p className="font-primary text-base leading-relaxed text-text-dim">
              Open to full-time roles and select collaborations. Initiate contact through any
              channel below.
            </p>
            <RevealGroup
              as="div"
              className="mt-7 flex flex-wrap justify-center gap-4"
              stagger={0.1}
              delayChildren={0.1}
            >
              <RevealItem scale>
                <NeonButton href={links.linkedin || undefined} icon={FiLinkedin} external>
                  LinkedIn
                </NeonButton>
              </RevealItem>
              <RevealItem scale>
                <NeonButton href={links.resumePdf || undefined} icon={FiFileText} external>
                  Resume
                </NeonButton>
              </RevealItem>
              <RevealItem scale>
                <NeonButton href={links.handshake || undefined} icon={FiBriefcase} color="magenta" external>
                  Handshake
                </NeonButton>
              </RevealItem>
              <RevealItem scale>
                <NeonButton href={`mailto:${contact.email}`} icon={FiMail} color="magenta">
                  Email
                </NeonButton>
              </RevealItem>
            </RevealGroup>
          </HoverPanel>
        </Reveal>
      </div>
    </section>
  );
}
