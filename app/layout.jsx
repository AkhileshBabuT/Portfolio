import { JetBrains_Mono, Orbitron } from 'next/font/google';
import './globals.css';
import { GridBackground } from '@/components/hud/GridBackground';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';
import { BootSequence } from '@/components/hud/BootSequence';
import { AmbientGlitch } from '@/components/hud/AmbientGlitch';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionNav } from '@/components/layout/SectionNav';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrainsMono',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata = {
  metadataBase: new URL('https://akhilesh-portfolio.vercel.app'),
  title: 'Akhilesh Babu Tumati — Full-Stack & AI Engineer',
  description:
    'Gamified sci-fi portfolio of Akhilesh Babu Tumati — full-stack and AI engineer building enterprise systems, AI agents, and production-grade web apps.',
  keywords: ['Akhilesh Babu Tumati', 'Full-Stack Engineer', 'AI Engineer', 'React', 'Next.js'],
  openGraph: {
    title: 'Akhilesh Babu Tumati — Full-Stack & AI Engineer',
    description: 'Gamified sci-fi portfolio — full-stack and AI engineering.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="font-primary bg-void text-text antialiased">
        <GridBackground />
        <ScanlineOverlay />
        <BootSequence />
        <AmbientGlitch />
        <Header />
        <SectionNav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
