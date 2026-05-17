'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { t } from '@/lib/motion';

// In-game action button. Renders <a> when href given, else <button>.
export function NeonButton({
  children,
  href,
  icon: Icon,
  color = 'cyan',
  external = false,
  onClick,
  className = '',
}) {
  const reduce = useReducedMotion();
  const palette =
    color === 'magenta'
      ? 'border-magenta/50 text-magenta hover:bg-magenta/10 hover:shadow-glow-magenta'
      : 'border-cyan/50 text-cyan hover:bg-cyan/10 hover:shadow-glow-cyan';
  // transition-colors uses duration-200 to approximate t.hover (0.24s)
  const cls = `group inline-flex items-center gap-2.5 border ${palette} clip-hud-sm bg-panel px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${className}`;
  const iconCls = reduce
    ? 'text-base transition-none'
    : 'text-base transition-transform duration-200 group-hover:scale-110';
  const inner = (
    <>
      {Icon && <Icon className={iconCls} />}
      <span>{children}</span>
    </>
  );
  const motionProps = reduce
    ? {}
    : { whileHover: { y: -2 }, whileTap: { scale: 0.95 }, transition: t.hover };
  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={cls}
        {...motionProps}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} className={cls} {...motionProps}>
      {inner}
    </motion.button>
  );
}
