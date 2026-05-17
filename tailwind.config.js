/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    container: { center: true, padding: '15px' },
    screens: { sm: '640px', md: '768px', lg: '960px', xl: '1200px' },
    fontFamily: {
      primary: 'var(--font-jetbrainsMono)',
      display: 'var(--font-orbitron)',
    },
    extend: {
      colors: {
        void: '#0a0a0f',
        panel: '#12121a',
        'panel-2': '#181824',
        edge: '#1f1f2e',
        cyan: { DEFAULT: '#00e5ff', dim: '#0891a8' },
        magenta: { DEFAULT: '#ff2d95', dim: '#a81e63' },
        text: { DEFAULT: '#e5e7eb', dim: '#8a8a9a' },
        primary: '#1c1c22',
        accent: { DEFAULT: '#00ff99', hover: '#00e187' },
      },
      boxShadow: {
        'glow-cyan': '0 0 12px rgba(0,229,255,0.45)',
        'glow-magenta': '0 0 12px rgba(255,45,149,0.45)',
        'glow-cyan-lg': '0 0 28px rgba(0,229,255,0.35)',
      },
      keyframes: {
        'grid-drift': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '0 -60px' } },
        flicker: {
          '0%,100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.7' },
          '98%': { opacity: '1' },
        },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'scan-sweep': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '8%': { opacity: '0.5' },
          '92%': { opacity: '0.5' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      animation: {
        'grid-drift': 'grid-drift 8s linear infinite',
        flicker: 'flicker 6s linear infinite',
        'scan-sweep': 'scan-sweep 7s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
