import { useState } from 'react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { useDsoPhotos } from '@/hooks/useAstroPhotos';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-react';

// Extract DSO ID and type from the active playlist item
function parseDsoInfo(itemId: string, filename: string) {
  const match = itemId.match(/^dso-(M\d+|C\d+)$/);
  if (!match) return null;
  return { dsoId: match[1], name: filename };
}

// We need the DSO type from the catalog — import it
import { dsoCatalog } from '@/data/pdfSlides';

export function AstroPhotoPanel() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dsoInfo = activeItem ? parseDsoInfo(activeItem.id, activeItem.filename) : null;

  // Find the DSO type from our catalog
  const catalogEntry = dsoInfo ? dsoCatalog.find((d) => d.id === dsoInfo.dsoId) : null;
  const dsoType = catalogEntry?.type;

  const { data: photos, isLoading } = useDsoPhotos(dsoInfo?.dsoId ?? null, dsoType);

  // Reset photo index when DSO changes
  const [lastDsoId, setLastDsoId] = useState<string | null>(null);
  if (dsoInfo?.dsoId !== lastDsoId) {
    setLastDsoId(dsoInfo?.dsoId ?? null);
    setPhotoIndex(0);
    setDismissed(false);
  }

  if (!dsoInfo || dismissed) return null;
  if (isLoading) {
    return (
      <div className={`absolute ${expanded ? 'inset-4' : 'top-4 right-4 w-80'} z-30 glass-panel-heavy rounded-xl p-3 transition-all`}>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <Camera className="w-3.5 h-3.5 animate-pulse" />
          <span>Loading astrophotography…</span>
        </div>
      </div>
    );
  }

  if (!photos || photos.length === 0) return null;

  const photo = photos[photoIndex % photos.length];
  const total = photos.length;

  return (
    <div
      className={`absolute z-30 transition-all duration-300 ${
        expanded
          ? 'inset-4 bottom-24'
          : 'top-4 right-4 w-80'
      }`}
    >
      <div className="glass-panel-heavy glow-border-cyan rounded-xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
          <div className="flex items-center gap-2 min-w-0">
            <Camera className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs font-medium truncate">{photo.title}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-muted-foreground mr-1">
              {photoIndex + 1}/{total}
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 rounded hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex-1 min-h-0 bg-black/40">
          <img
            src={photo.sourceUrl}
            alt={photo.altText}
            className="w-full h-full object-contain"
            loading="lazy"
          />

          {/* Nav arrows */}
          {total > 1 && (
            <>
              <button
                onClick={() => setPhotoIndex((photoIndex - 1 + total) % total)}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 hover:bg-background/90 text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPhotoIndex((photoIndex + 1) % total)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 hover:bg-background/90 text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Footer with tags */}
        <div className="px-3 py-1.5 flex items-center gap-1 flex-wrap">
          {photo.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary/60 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
