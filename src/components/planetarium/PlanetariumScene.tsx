import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { ProjectionDome } from './ProjectionDome';
import { SceneCamera } from './SceneCamera';
import { PlaceholderDome } from './PlaceholderDome';
import { usePlanetariumStore } from '@/store/planetariumStore';

export function PlanetariumScene() {
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const hasMedia = activeIndex >= 0;

  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#030308' }}
    >
      <Suspense fallback={null}>
        <SceneCamera />
        <Stars radius={120} depth={60} count={4000} factor={5} saturation={0.1} fade speed={0.8} />
        <ambientLight intensity={0.05} />
        {hasMedia ? <ProjectionDome /> : <PlaceholderDome />}
      </Suspense>
    </Canvas>
  );
}
