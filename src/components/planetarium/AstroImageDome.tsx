import { usePlanetariumStore } from '@/store/planetariumStore';
import { Html } from '@react-three/drei';

export function AstroImageDome() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const screenRotation = usePlanetariumStore((s) => s.screenRotation);
  const screenTilt = usePlanetariumStore((s) => s.screenTilt);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const screenHeight = usePlanetariumStore((s) => s.screenHeight);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  if (!activeItem || activeItem.type !== 'image') return null;

  const radius = 10 * screenSize;
  const thetaLength = (curveAmount / 360) * Math.PI * 2;
  const arcWidth = radius * thetaLength;
  const baseHeight = 8 * screenSize * screenHeight;

  // Use a fixed internal resolution for the image panel
  const panelWidth = 1200;
  const panelHeight = 900;

  const scaleX = arcWidth / panelWidth;
  const scaleY = baseHeight / panelHeight;
  const uniformScale = Math.min(scaleX, scaleY) * 25;

  return (
    <group rotation={[(screenTilt * Math.PI) / 180, (screenRotation * Math.PI) / 180, 0]}>
      <Html
        transform
        position={[0, 0, -radius + 0.2]}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #0a0a14 0%, #030308 100%)',
            borderRadius: '12px',
            position: 'relative',
          }}
        >
          <img
            src={activeItem.blobUrl}
            alt={activeItem.filename}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
            crossOrigin="anonymous"
          />
          {/* Title overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px 20px 16px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: '#e0e0e0',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            {activeItem.filename}
          </div>
        </div>
      </Html>
    </group>
  );
}
