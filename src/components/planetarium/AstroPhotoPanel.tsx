import { useState, useEffect, useRef } from 'react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { getDsoPhotos } from '@/hooks/useAstroPhotos';
import { GALLERY_BASE_URL } from '@/data/dsoPhotos';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

function parseDsoId(itemId: string): string | null {
  const match = itemId.match(/^dso-(M\d+|C\d+)$/);
  return match ? match[1] : null;
}

export function AstroPhotoPanel() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dsoId = activeItem ? parseDsoId(activeItem.id) : null;
  const photos = getDsoPhotos(dsoId);

  // Reset when DSO changes
  const prevDsoId = useRef<string | null>(null);
  useEffect(() => {
    if (dsoId !== prevDsoId.current) {
      prevDsoId.current = dsoId;
      setPhotoIndex(0);
      setDismissed(false);
    }
  }, [dsoId]);

  if (!dsoId || dismissed || photos.length === 0) return null;

  const photo = photos[photoIndex % photos.length];
  const total = photos.length;

  return (
    <div
      className={`absolute z-30 transition-all duration-300 ${
        expanded ? 'inset-4 bottom-24' : 'top-4 right-4 w-80'
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
            {total > 1 && (
              <span className="text-[10px] text-muted-foreground mr-1">
                {photoIndex + 1}/{total}
              </span>
            )}
            <a
              href={`${GALLERY_BASE_URL}/${photo.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-secondary/60 text-muted-foreground hover:text-primary transition-colors"
              title="View in gallery"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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
            src={photo.imageUrl}
            alt={photo.title}
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
      </div>
    </div>
  );
}
