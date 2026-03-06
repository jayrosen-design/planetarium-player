import { useEffect, useRef } from 'react';
import { PlanetariumScene } from '@/components/planetarium/PlanetariumScene';
import { MediaBar } from '@/components/planetarium/MediaBar';
import { SettingsPanel } from '@/components/planetarium/SettingsPanel';
import { PlaylistPanel } from '@/components/planetarium/PlaylistPanel';
import { AstroPhotoPanel } from '@/components/planetarium/AstroPhotoPanel';
import { AstroImageOverlay } from '@/components/planetarium/AstroImageDome';

import { pdfSlides } from '@/data/pdfSlides';
import { usePlanetariumStore } from '@/store/planetariumStore';

function ImageAutoplay() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const isPlaying = usePlanetariumStore((s) => s.isPlaying);
  const nextTrack = usePlanetariumStore((s) => s.nextTrack);

  const activeItem = activeIndex >= 0 ? playlist[activeIndex] : null;

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isPlaying && activeItem?.type === 'image') {
      timerRef.current = setInterval(() => {
        nextTrack();
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeItem?.id, activeItem?.type, nextTrack]);

  return null;
}

const Index = () => {
  const loadSlides = usePlanetariumStore((s) => s.loadSlides);
  const playlist = usePlanetariumStore((s) => s.playlist);

  useEffect(() => {
    if (playlist.length === 0) {
      loadSlides(pdfSlides);
      // Start at first item (first DSO catalog entry)
      usePlanetariumStore.getState().setActiveIndex(0);
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background select-none">
      <PlanetariumScene />
      <AstroImageOverlay />
      <PlaylistPanel />
      <SettingsPanel />
      <MediaBar />
      <ImageAutoplay />
    </div>
  );
};

export default Index;
