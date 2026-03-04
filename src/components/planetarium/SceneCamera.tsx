import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePlanetariumStore } from '@/store/planetariumStore';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export function SceneCamera() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const distance = usePlanetariumStore((s) => s.distance);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, -5);
      controlsRef.current.update();
    }
  }, []);

  useFrame(({ camera }) => {
    camera.position.z = distance;
    if (controlsRef.current) {
      controlsRef.current.target.z = distance - 5;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      rotateSpeed={0.5}
      dampingFactor={0.1}
      enableDamping
      minDistance={-10}
      maxDistance={15}
    />
  );
}
