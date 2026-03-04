import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { ProjectionDome } from './ProjectionDome';
import { SceneCamera } from './SceneCamera';

export function PlanetariumScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ antialias: true }}
      style={{ background: '#000' }}
    >
      <Suspense fallback={null}>
        <SceneCamera />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.1} />
        <ProjectionDome />
      </Suspense>
    </Canvas>
  );
}
