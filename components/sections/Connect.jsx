'use client';
import { FiLinkedin, FiFileText, FiMail, FiBriefcase } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';
import { NeonButton } from '@/components/hud/NeonButton';

export default function Connect() {
  const { links, contact } = profile;
  return (
    <section id="connect" aria-labelledby="connect-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-3xl">
        <Reveal>
          <div id="connect-heading">
            <SectionTag number="06" label="Connect" color="magenta" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FramePanel color="magenta" className="p-8 text-center">
            <p className="font-primary text-base leading-relaxed text-text-dim">
              Open to full-time roles and select collaborations. Initiate contact through any
              channel below.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <NeonButton href={links.linkedin || undefined} icon={FiLinkedin} external>
                LinkedIn
              </NeonButton>
              <NeonButton href={links.resumePdf || undefined} icon={FiFileText} external>
                Resume
              </NeonButton>
              <NeonButton href={links.handshake || undefined} icon={FiBriefcase} color="magenta" external>
                Handshake
              </NeonButton>
              <NeonButton href={`mailto:${contact.email}`} icon={FiMail} color="magenta">
                Email
              </NeonButton>
            </div>
          </FramePanel>
        </Reveal>
      </div>
    </section>
  );
}
