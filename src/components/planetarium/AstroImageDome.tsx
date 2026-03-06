import { usePlanetariumStore } from '@/store/planetariumStore';
import { Html } from '@react-three/drei';
import { dsoPhotoMap } from '@/data/dsoPhotos';
import { useState, useEffect } from 'react';

/** Extract DSO ID from a playlist item id like "dso-M31" */
function extractDsoId(itemId: string): string | null {
  const match = itemId.match(/^dso-(M\d+|C\d+)$/);
  return match ? match[1] : null;
}

/** Check if item is from the Astrophotography folder */
export function isAstroItem(item: { id: string; folder?: string } | null) {
  return item?.folder === 'Astrophotography' || item?.id?.startsWith('astro-');
}

/**
 * When a DSO catalog simulation is active and has matching astrophotography,
 * renders the astrophoto as a second Html panel next to the simulation iframe.
 */
export function AstroPhotoDome() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const screenRotation = usePlanetariumStore((s) => s.screenRotation);
  const screenTilt = usePlanetariumStore((s) => s.screenTilt);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const screenHeight = usePlanetariumStore((s) => s.screenHeight);
  const iframeWidth = usePlanetariumStore((s) => s.iframeWidth);
  const iframeHeight = usePlanetariumStore((s) => s.iframeHeight);

  const [photoIdx, setPhotoIdx] = useState(0);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  // Reset photo index when active item changes
  useEffect(() => {
    setPhotoIdx(0);
  }, [activeItem?.id]);
  if (!activeItem) return null;

  // Determine what image to show
  let imageUrl: string | null = null;
  let imageTitle = '';
  let photos: { imageUrl: string; title: string }[] = [];
  let isStandalone = false;

  if (isAstroItem(activeItem)) {
    // Standalone astrophotography item - show just the image
    imageUrl = activeItem.blobUrl;
    imageTitle = activeItem.filename;
    isStandalone = true;
  } else if (activeItem.type === 'website') {
    // DSO catalog item - check for matching astrophoto
    const dsoId = extractDsoId(activeItem.id);
    if (dsoId && dsoPhotoMap[dsoId]) {
      photos = dsoPhotoMap[dsoId];
      const idx = photoIdx % photos.length;
      imageUrl = photos[idx].imageUrl;
      imageTitle = photos[idx].title;
    }
  }

  if (!imageUrl) return null;

  const radius = 10 * screenSize;
  const thetaLength = (curveAmount / 360) * Math.PI * 2;
  const arcWidth = radius * thetaLength;
  const baseHeight = 8 * screenSize * screenHeight;

  const scaleX = arcWidth / iframeWidth;
  const scaleY = baseHeight / iframeHeight;
  const uniformScale = Math.min(scaleX, scaleY) * 25;

  // For standalone astro items, center the panel. For DSO companion, offset to the right.
  const panelWidth = isStandalone ? iframeWidth : iframeWidth * 0.48;
  const panelHeight = iframeHeight;

  // Position: standalone = centered, companion = offset right of the simulation
  const xOffset = isStandalone ? 0 : (iframeWidth * 0.52) / 2 + 10;

  return (
    <group rotation={[(screenTilt * Math.PI) / 180, (screenRotation * Math.PI) / 180, 0]}>
      <Html
        transform
        position={[isStandalone ? 0 : xOffset * uniformScale * 0.04, 0, -radius + 0.2]}
        scale={uniformScale}
        occlude={false}
        style={{
          width: `${panelWidth}px`,
          height: `${panelHeight}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <img
            src={imageUrl}
            alt={imageTitle}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '12px',
            }}
          />
          {/* Title + navigation */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px 16px 12px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <span style={{ color: '#ccc', fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif" }}>
              {imageTitle}
            </span>
            {photos.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setPhotoIdx((photoIdx - 1 + photos.length) % photos.length); }}
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ‹
                </button>
                <span style={{ color: '#ccc', fontSize: '14px', fontWeight: 500 }}>
                  {(photoIdx % photos.length) + 1}/{photos.length}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); setPhotoIdx((photoIdx + 1) % photos.length); }}
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}
