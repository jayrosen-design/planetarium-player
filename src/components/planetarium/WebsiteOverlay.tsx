import { usePlanetariumStore } from '@/store/planetariumStore';
import { Html } from '@react-three/drei';

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

  // Iframe pixel dimensions
  const iframeWidth = 1280;
  const iframeHeight = 800;

  // Scale so the iframe spans the dome width in world units
  const scaleX = arcWidth / iframeWidth;
  const scaleY = baseHeight / iframeHeight;
  const uniformScale = Math.min(scaleX, scaleY) * 1000;

  return (
    <group rotation={[(screenTilt * Math.PI) / 180, (screenRotation * Math.PI) / 180, 0]}>
      <Html
        transform
        position={[0, 0, -radius + 0.2]}
        scale={uniformScale}
        occlude={false}
        style={{
          width: `${iframeWidth}px`,
          height: `${iframeHeight}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          pointerEvents: 'auto',
        }}
      >
        <iframe
          src={activeItem.url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          title={activeItem.filename}
        />
      </Html>
    </group>
  );
}
