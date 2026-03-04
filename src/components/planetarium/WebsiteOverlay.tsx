import { usePlanetariumStore } from '@/store/planetariumStore';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function WebsiteDome() {
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const screenRotation = usePlanetariumStore((s) => s.screenRotation);
  const screenTilt = usePlanetariumStore((s) => s.screenTilt);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;

  if (!activeItem || activeItem.type !== 'website' || !activeItem.url) return null;

  // Match the dome cylinder dimensions
  const radius = 10 * screenSize;
  const iframeWidth = 1920;
  const iframeHeight = 1080;
  // Scale to match the cylinder's visual size (cylinder radius=10, so ~20 units wide at thetaLength)
  const arcWidth = 2 * radius * Math.sin((curveAmount / 360) * Math.PI);
  const scaleFactor = (arcWidth / iframeWidth) * 0.95;

  return (
    <group rotation={[(screenTilt * Math.PI) / 180, (screenRotation * Math.PI) / 180, 0]}>
      <Html
        transform
        position={[0, 0, -radius + 0.5]}
        scale={scaleFactor}
        occlude={false}
        style={{
          width: `${iframeWidth}px`,
          height: `${iframeHeight}px`,
          borderRadius: '12px',
          overflow: 'hidden',
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
