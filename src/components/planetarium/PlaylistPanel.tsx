import { X, Plus, Trash2, Film, ImageIcon } from 'lucide-react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { useRef } from 'react';

export function PlaylistPanel() {
  const showPlaylist = usePlanetariumStore((s) => s.showPlaylist);
  const togglePlaylist = usePlanetariumStore((s) => s.togglePlaylist);
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const addFiles = usePlanetariumStore((s) => s.addFiles);
  const removeItem = usePlanetariumStore((s) => s.removeItem);
  const setActiveIndex = usePlanetariumStore((s) => s.setActiveIndex);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!showPlaylist) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="absolute left-4 top-4 bottom-20 w-72 z-30 glass-panel glow-border rounded-xl flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-primary glow-text">
          Playlist
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1 rounded hover:bg-secondary transition-colors text-primary"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={togglePlaylist} className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
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

      <div className="flex-1 overflow-y-auto">
        {playlist.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-full p-6 text-center cursor-pointer hover:bg-secondary/30 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Drop files or click to add</p>
            <p className="text-xs text-muted-foreground/60 mt-1">MP4, WebM, Images</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {playlist.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors group ${
                  i === activeIndex
                    ? 'bg-primary/15 border border-primary/30'
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => setActiveIndex(i)}
              >
                {item.type === 'video' ? (
                  <Film className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-accent shrink-0" />
                )}
                <span className="text-sm truncate flex-1">
                  {item.filename}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/20 transition-all text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
