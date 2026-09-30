import { JetBrains_Mono, Orbitron } from 'next/font/google';
import './globals.css';
import { GridBackground } from '@/components/hud/GridBackground';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';
import { BootSequence } from '@/components/hud/BootSequence';
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
  title: 'Akhilesh Babu Tumati — Cloud / Full Stack Engineer',
  description:
    'Portfolio of Akhilesh Babu Tumati, a cloud and full stack engineer building serverless systems, reliable release pipelines, and AI-powered products.',
  keywords: ['Akhilesh Babu Tumati', 'Cloud Engineer', 'Full Stack Engineer', 'AWS', 'DevOps', 'Next.js'],
  openGraph: {
    title: 'Akhilesh Babu Tumati — Cloud / Full Stack Engineer',
    description: 'Cloud systems, full stack engineering, DevOps, and AI-powered projects.',
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
        <Header />
        <SectionNav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
