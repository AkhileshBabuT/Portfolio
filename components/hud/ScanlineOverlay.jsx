// Fixed full-viewport scanline texture + vignette. Decorative, non-interactive.
export function ScanlineOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
          boxShadow: 'inset 0 0 180px rgba(0,0,0,0.9)',
        }}
      />
    </div>
  );
}
