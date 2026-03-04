import { PlanetariumScene } from '@/components/planetarium/PlanetariumScene';
import { MediaBar } from '@/components/planetarium/MediaBar';
import { SettingsPanel } from '@/components/planetarium/SettingsPanel';
import { PlaylistPanel } from '@/components/planetarium/PlaylistPanel';

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background select-none">
      <PlanetariumScene />
      <PlaylistPanel />
      <SettingsPanel />
      <MediaBar />
    </div>
  );
};

export default Index;
