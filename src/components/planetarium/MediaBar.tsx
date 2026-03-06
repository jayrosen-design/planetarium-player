import { useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Maximize, Minimize, Volume2, VolumeX, Upload, List, Settings } from 'lucide-react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { Slider } from '@/components/ui/slider';

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
  const volume = usePlanetariumStore((s) => s.volume);
  const setVolume = usePlanetariumStore((s) => s.setVolume);
  const togglePlaylist = usePlanetariumStore((s) => s.togglePlaylist);
  const toggleSettings = usePlanetariumStore((s) => s.toggleSettings);
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const addFiles = usePlanetariumStore((s) => s.addFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = activeIndex >= 0 ? playlist[activeIndex] : null;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pct * duration;
    const video = (window as any).__planetarium_video as HTMLVideoElement | null;
    if (video) {
      video.currentTime = newTime;
      usePlanetariumStore.getState().setCurrentTime(newTime);
    }
  }, [duration]);

  const handleVolumeChange = useCallback(([v]: number[]) => {
    setVolume(v);
    const video = (window as any).__planetarium_video as HTMLVideoElement | null;
    if (video) video.volume = v;
  }, [setVolume]);

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (activeItem?.type === 'website') {
      // For websites, fullscreen the iframe directly
      const iframe = document.getElementById('planetarium-website-iframe') as HTMLIFrameElement | null;
      if (iframe) {
        iframe.requestFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-3rem)] max-w-4xl">
      <div className="glass-panel-heavy glow-border-cyan rounded-2xl overflow-hidden">
        {/* Progress bar */}
        {activeItem?.type === 'video' && duration > 0 && (
          <div
            className="h-1 w-full cursor-pointer group relative mx-auto"
            onClick={handleSeek}
          >
            <div className="absolute inset-0 bg-secondary/60" />
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all shadow-[0_0_10px_hsla(var(--glow-cyan)/0.5)]"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/10 transition-opacity" />
          </div>
        )}

        <div className="flex items-center gap-3 px-5 py-3">
          {/* Left: playlist toggle & track info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={togglePlaylist}
              className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-primary"
              title="Playlist"
            >
              <List className="w-[18px] h-[18px]" />
            </button>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">
                {activeItem ? activeItem.filename : 'No media loaded'}
              </div>
              {activeItem?.type === 'video' && duration > 0 && (
                <div className="text-[10px] font-mono text-muted-foreground">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              )}
            </div>
          </div>

          {/* Center: transport controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevTrack}
              className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-foreground"
            >
              <SkipBack className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/85 transition-all glow-border-cyan mx-1"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={nextTrack}
              className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Right: volume, upload, settings, fullscreen */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={() => handleVolumeChange([volume > 0 ? 0 : 0.8])}
                className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-foreground"
              >
                {volume > 0 ? <Volume2 className="w-[18px] h-[18px]" /> : <VolumeX className="w-[18px] h-[18px]" />}
              </button>
              <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-20"
                />
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-primary"
              title="Upload Media"
            >
              <Upload className="w-[18px] h-[18px]" />
            </button>

            <button
              onClick={toggleSettings}
              className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-primary"
              title="Settings"
            >
              <Settings className="w-[18px] h-[18px]" />
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-foreground"
              title="Fullscreen"
            >
              <Maximize className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
