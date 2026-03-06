import { usePlanetariumStore } from '@/store/planetariumStore';

/**
 * Renders astrophotography images as a full-screen HTML overlay
 * (outside the 3D canvas) similar to how the website iframe works,
 * but as a separate flat image panel.
 */
export function AstroImageOverlay() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  if (!activeItem || !isAstroItem(activeItem)) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div
        className="relative w-[85vw] h-[80vh] max-w-[1400px] rounded-xl overflow-hidden pointer-events-auto glass-panel-heavy glow-border-cyan"
        style={{ background: 'radial-gradient(ellipse at center, hsl(225 25% 6% / 0.95), hsl(225 25% 3% / 0.98))' }}
      >
        <img
          src={activeItem.blobUrl}
          alt={activeItem.filename}
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
        />
        {/* Title overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4"
          style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}
        >
          <span className="text-sm font-medium text-foreground">{activeItem.filename}</span>
        </div>
      </div>
    </div>
  );
}

export function isAstroItem(item: { id: string; folder?: string } | null) {
  return item?.folder === 'Astrophotography' || item?.id?.startsWith('astro-');
}
