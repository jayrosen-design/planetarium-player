import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePlanetariumStore } from '@/store/planetariumStore';

export function ProjectionDome() {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const isPlaying = usePlanetariumStore((s) => s.isPlaying);
  const volume = usePlanetariumStore((s) => s.volume);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const setCurrentTime = usePlanetariumStore((s) => s.setCurrentTime);
  const setDuration = usePlanetariumStore((s) => s.setDuration);
  const setIsPlaying = usePlanetariumStore((s) => s.setIsPlaying);

  const activeItem = activeIndex >= 0 && activeIndex < playlist.length ? playlist[activeIndex] : null;
  const thetaLength = (curveAmount / 360) * Math.PI * 2;
  const thetaStart = -thetaLength / 2 + Math.PI; // center the projection

  // Cylinder geometry args: [radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]
  const geometryArgs = useMemo<[number, number, number, number, number, boolean, number, number]>(() => {
    const radius = 10;
    return [radius, radius, 8, 64, 1, true, thetaStart, thetaLength];
  }, [thetaStart, thetaLength]);

  // Create/manage video element
  useEffect(() => {
    if (!activeItem) {
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
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

      if (textureRef.current) textureRef.current.dispose();
      textureRef.current = tex;
    } else {
      // Image
      const loader = new THREE.TextureLoader();
      loader.load(activeItem.blobUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.repeat.x = -1;
        tex.offset.x = 1;
        if (textureRef.current) textureRef.current.dispose();
        textureRef.current = tex;
        setDuration(0);
        setIsPlaying(false);
      });

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    }

    return () => {
      // cleanup handled by next effect run
    };
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

  // Update current time
  useFrame(() => {
    const video = videoRef.current;
    if (video && activeItem?.type === 'video' && !video.paused) {
      setCurrentTime(video.currentTime);
    }

    if (meshRef.current) {
      meshRef.current.scale.set(screenSize, screenSize, screenSize);
    }
  });

  // Expose video ref globally for seek
  useEffect(() => {
    (window as any).__planetarium_video = videoRef.current;
    return () => {
      (window as any).__planetarium_video = null;
    };
  }, [activeItem?.id]);

  if (!activeItem) {
    return (
      <mesh ref={meshRef}>
        <cylinderGeometry args={geometryArgs} />
        <meshBasicMaterial side={THREE.BackSide} color="#111118" />
      </mesh>
    );
  }

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={geometryArgs} />
      {textureRef.current ? (
        <meshBasicMaterial
          side={THREE.BackSide}
          map={textureRef.current}
          toneMapped={false}
        />
      ) : (
        <meshBasicMaterial side={THREE.BackSide} color="#111118" />
      )}
    </mesh>
  );
}
