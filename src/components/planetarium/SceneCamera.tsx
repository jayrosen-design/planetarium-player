import { useFrame, useThree } from '@react-three/fiber';
import { usePlanetariumStore } from '@/store/planetariumStore';

export function SceneCamera() {
  const { camera } = useThree();
  const distance = usePlanetariumStore((s) => s.distance);

  useFrame(() => {
    camera.position.z = distance;
  });

  return null;
}
