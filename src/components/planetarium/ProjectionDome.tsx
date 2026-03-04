import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePlanetariumStore } from '@/store/planetariumStore';

export function ProjectionDome() {
  const meshRef = useRef<THREE.Mesh>(null);
  const bgMeshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const isPlaying = usePlanetariumStore((s) => s.isPlaying);
  const volume = usePlanetariumStore((s) => s.volume);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const screenHeight = usePlanetariumStore((s) => s.screenHeight);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const bgColor = usePlanetariumStore((s) => s.bgColor);
  const stretchToFill = usePlanetariumStore((s) => s.stretchToFill);
  const screenRotation = usePlanetariumStore((s) => s.screenRotation);
  const setCurrentTime = usePlanetariumStore((s) => s.setCurrentTime);
  const setDuration = usePlanetariumStore((s) => s.setDuration);
  const setIsPlaying = usePlanetariumStore((s) => s.setIsPlaying);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;
  const thetaLength = (curveAmount / 360) * Math.PI * 2;
  const thetaStart = -thetaLength / 2 + Math.PI;

  const baseHeight = 8;
  const actualHeight = baseHeight * screenHeight;

  // Background cylinder (slightly larger, for the solid color behind the image)
  const bgGeometryArgs = useMemo<[number, number, number, number, number, boolean, number, number]>(() => {
    return [10.05, 10.05, actualHeight, 64, 1, true, thetaStart, thetaLength];
  }, [thetaStart, thetaLength, actualHeight]);

  // Image cylinder
  const geometryArgs = useMemo<[number, number, number, number, number, boolean, number, number]>(() => {
    const imageHeight = stretchToFill ? actualHeight : baseHeight;
    return [10, 10, imageHeight, 64, 1, true, thetaStart, thetaLength];
  }, [thetaStart, thetaLength, stretchToFill, actualHeight, baseHeight]);

  // Load texture when active item changes
  useEffect(() => {
    if (texture) {
      texture.dispose();
      setTexture(null);
    }

    if (!activeItem) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
      return;
    }

    if (activeItem.type === 'video') {
      let video = videoRef.current;
      if (!video) {
        video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.playsInline = true;
        video.loop = true;
        videoRef.current = video;
      }
      video.src = activeItem.blobUrl;
      video.load();

      video.onloadedmetadata = () => {
        setDuration(video!.duration);
      };
      video.onended = () => {
        setIsPlaying(false);
      };

      const tex = new THREE.VideoTexture(video);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.repeat.x = -1;
      tex.offset.x = 1;
      setTexture(tex);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const tex = new THREE.Texture(img);
        tex.needsUpdate = true;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.repeat.x = -1;
        tex.offset.x = 1;
        tex.wrapS = THREE.RepeatWrapping;
        setTexture(tex);
        setDuration(0);
      };
      img.src = activeItem.blobUrl;
    }
  }, [activeItem?.id, activeItem?.blobUrl]);

  // Play/pause sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeItem || activeItem.type !== 'video') return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, activeItem?.id]);

  // Volume sync
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.volume = volume;
  }, [volume]);

  // Update current time & scale
  useFrame(() => {
    const video = videoRef.current;
    if (video && activeItem?.type === 'video' && !video.paused) {
      setCurrentTime(video.currentTime);
    }

    if (meshRef.current) {
      meshRef.current.scale.set(screenSize, screenSize, screenSize);
    }
    if (bgMeshRef.current) {
      bgMeshRef.current.scale.set(screenSize, screenSize, screenSize);
    }
  });

  // Expose video ref globally for seek
  useEffect(() => {
    (window as any).__planetarium_video = videoRef.current;
    return () => {
      (window as any).__planetarium_video = null;
    };
  }, [activeItem?.id]);

  return (
    <group rotation={[0, (screenRotation * Math.PI) / 180, 0]}>
      {/* Background color cylinder (behind the image, visible when height > image) */}
      <mesh ref={bgMeshRef}>
        <cylinderGeometry args={bgGeometryArgs} />
        <meshBasicMaterial side={THREE.BackSide} color={bgColor} toneMapped={false} />
      </mesh>

      {/* Image/video cylinder */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={geometryArgs} />
        <meshBasicMaterial
          side={THREE.BackSide}
          map={texture}
          color={texture ? undefined : '#111118'}
          toneMapped={false}
          key={texture?.uuid || 'no-tex'}
        />
      </mesh>
    </group>
  );
}
