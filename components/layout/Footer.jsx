import { profile } from '@/components/data/profile';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-edge bg-void/80 py-8">
      <div className="container mx-auto flex flex-col items-center gap-2 px-6 text-center">
        <p className="font-display text-xs tracking-[0.2em] text-text-dim">
          {'// END_OF_LINE'}
        </p>
        <p className="font-primary text-xs text-text-dim">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js + Framer Motion.
        </p>
      </div>
    </footer>
  );
}
