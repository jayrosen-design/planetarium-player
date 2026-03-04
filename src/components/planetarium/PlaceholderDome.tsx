import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { usePlanetariumStore } from '@/store/planetariumStore';
import galaxyImage from '@/assets/galaxy-placeholder.jpg';

export function PlaceholderDome() {
  const meshRef = useRef<THREE.Mesh>(null);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);

  const thetaLength = (curveAmount / 360) * Math.PI * 2;
  const thetaStart = -thetaLength / 2 + Math.PI;

  const geometryArgs = useMemo<[number, number, number, number, number, boolean, number, number]>(
    () => [10, 10, 8, 64, 1, true, thetaStart, thetaLength],
    [thetaStart, thetaLength]
  );

  const texture = useLoader(THREE.TextureLoader, galaxyImage);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.x = -1;
  texture.offset.x = 1;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(screenSize, screenSize, screenSize);
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={geometryArgs} />
      <meshBasicMaterial side={THREE.BackSide} map={texture} toneMapped={false} opacity={0.7} transparent />
    </mesh>
  );
}
