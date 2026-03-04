import { Play, Pause, SkipBack, SkipForward, Maximize, List, Settings } from 'lucide-react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { useCallback } from 'react';

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MediaBar() {
  const isPlaying = usePlanetariumStore((s) => s.isPlaying);
  const togglePlay = usePlanetariumStore((s) => s.togglePlay);
  const nextTrack = usePlanetariumStore((s) => s.nextTrack);
  const prevTrack = usePlanetariumStore((s) => s.prevTrack);
  const currentTime = usePlanetariumStore((s) => s.currentTime);
  const duration = usePlanetariumStore((s) => s.duration);
  const togglePlaylist = usePlanetariumStore((s) => s.togglePlaylist);
  const toggleSettings = usePlanetariumStore((s) => s.toggleSettings);
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);

  const activeItem = activeIndex >= 0 ? playlist[activeIndex] : null;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const newTime = pct * duration;
    const video = (window as any).__planetarium_video as HTMLVideoElement | null;
    if (video) {
      video.currentTime = newTime;
      usePlanetariumStore.getState().setCurrentTime(newTime);
    }
  }, [duration]);

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 glass-panel border-t border-border">
      {/* Progress bar */}
      {activeItem?.type === 'video' && duration > 0 && (
        <div
          className="h-1 w-full cursor-pointer group relative"
          onClick={handleSeek}
        >
          <div className="absolute inset-0 bg-muted" />
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/20 transition-opacity" />
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: playlist & track info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button onClick={togglePlaylist} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <List className="w-5 h-5" />
          </button>
          <div className="truncate text-sm font-mono text-muted-foreground">
            {activeItem ? activeItem.filename : 'No media loaded'}
          </div>
        </div>

        {/* Center: controls */}
        <div className="flex items-center gap-2">
          <button onClick={prevTrack} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-border"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button onClick={nextTrack} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Right: time & settings */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {activeItem?.type === 'video' && (
            <span className="text-xs font-mono text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}
          <button onClick={toggleSettings} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={handleFullscreen} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
