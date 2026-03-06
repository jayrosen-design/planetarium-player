import { usePlanetariumStore } from '@/store/planetariumStore';
import { Html } from '@react-three/drei';
import { dsoPhotoMap } from '@/data/dsoPhotos';

function hasDsoPhoto(itemId: string): boolean {
  const match = itemId.match(/^dso-(.+)$/);
  return match ? !!dsoPhotoMap[match[1]] : false;
}

export function WebsiteDome() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const screenRotation = usePlanetariumStore((s) => s.screenRotation);
  const screenTilt = usePlanetariumStore((s) => s.screenTilt);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const screenHeight = usePlanetariumStore((s) => s.screenHeight);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  if (!activeItem || activeItem.type !== 'website' || !activeItem.url) return null;

  const radius = 10 * screenSize;
  const thetaLength = (curveAmount / 360) * Math.PI * 2;
  const arcWidth = radius * thetaLength;
  const baseHeight = 8 * screenSize * screenHeight;

  const iframeWidth = usePlanetariumStore((s) => s.iframeWidth);
  const iframeHeight = usePlanetariumStore((s) => s.iframeHeight);

  // If this DSO has a companion astrophoto, shrink and offset left
  const hasCompanion = hasDsoPhoto(activeItem.id);
  const panelWidth = hasCompanion ? iframeWidth * 0.48 : iframeWidth;

  const scaleX = arcWidth / iframeWidth;
  const scaleY = baseHeight / iframeHeight;
  const uniformScale = Math.min(scaleX, scaleY) * 25;

  // Offset left when companion exists
  const xOffset = hasCompanion ? -(iframeWidth * 0.52) / 2 - 10 : 0;

  return (
    <group rotation={[(screenTilt * Math.PI) / 180, (screenRotation * Math.PI) / 180, 0]}>
      <Html
        transform
        position={[hasCompanion ? xOffset * uniformScale * 0.04 : 0, 0, -radius + 0.2]}
        scale={uniformScale}
        occlude={false}
        style={{
          width: `${panelWidth}px`,
          height: `${iframeHeight}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          pointerEvents: 'auto',
          background: 'transparent',
        }}
      >
        <iframe
          key={activeItem.id}
          id="planetarium-website-iframe"
          src={activeItem.url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          allowFullScreen
          title={activeItem.filename}
        />
      </Html>
    </group>
  );
}