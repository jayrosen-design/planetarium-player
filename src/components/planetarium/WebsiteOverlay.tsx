import { usePlanetariumStore } from '@/store/planetariumStore';

export function WebsiteOverlay() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  if (!activeItem || activeItem.type !== 'website' || !activeItem.url) return null;

  return (
    <div className="absolute inset-0 z-10">
      <iframe
        src={activeItem.url}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        title={activeItem.filename}
      />
    </div>
  );
}
