import { X, Plus, Trash2, Film, ImageIcon, Upload, Globe, FolderOpen, FolderClosed, ChevronRight, ChevronDown } from 'lucide-react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { useRef, useCallback, useState, useMemo } from 'react';

function formatDuration(seconds?: number): string {
  if (!seconds || !isFinite(seconds)) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface PlaylistFolder {
  name: string;
  items: { item: typeof usePlanetariumStore extends (s: any) => infer R ? any : never; index: number }[];
}

export function PlaylistPanel() {
  const showPlaylist = usePlanetariumStore((s) => s.showPlaylist);
  const togglePlaylist = usePlanetariumStore((s) => s.togglePlaylist);
  const playlist = usePlanetariumStore((s) => s.playlist);
  const activeIndex = usePlanetariumStore((s) => s.activeIndex);
  const addFiles = usePlanetariumStore((s) => s.addFiles);
  const removeItem = usePlanetariumStore((s) => s.removeItem);
  const setActiveIndex = usePlanetariumStore((s) => s.setActiveIndex);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderName)) next.delete(folderName);
      else next.add(folderName);
      return next;
    });
  };

  // Group items: ungrouped first, then folders
  const { ungrouped, folders } = useMemo(() => {
    const ungrouped: { item: (typeof playlist)[0]; index: number }[] = [];
    const folderMap = new Map<string, { item: (typeof playlist)[0]; index: number }[]>();

    playlist.forEach((item, index) => {
      if (item.folder) {
        if (!folderMap.has(item.folder)) folderMap.set(item.folder, []);
        folderMap.get(item.folder)!.push({ item, index });
      } else {
        ungrouped.push({ item, index });
      }
    });

    const folders: PlaylistFolder[] = [];
    folderMap.forEach((items, name) => folders.push({ name, items }));

    return { ungrouped, folders };
  }, [playlist]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  }, [addFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  if (!showPlaylist) return null;

  const renderItem = (item: (typeof playlist)[0], i: number) => {
    const isActive = i === activeIndex;
    return (
      <div
        key={item.id}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all group ${
          isActive
            ? 'glass-panel glow-active'
            : 'hover:bg-secondary/40'
        }`}
        onClick={() => setActiveIndex(i)}
      >
        {/* Thumbnail */}
        <div className={`w-12 h-8 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center ${
          isActive ? 'ring-1 ring-primary/50' : 'bg-secondary/60'
        }`}>
          {item.thumbnailUrl ? (
            <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
          ) : item.type === 'video' ? (
            <Film className="w-4 h-4 text-primary/60" />
          ) : item.type === 'website' ? (
            <Globe className="w-4 h-4 text-green-400/60" />
          ) : (
            <ImageIcon className="w-4 h-4 text-accent/60" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className={`text-xs truncate ${isActive ? 'text-primary font-medium' : 'text-foreground/80'}`}>
            {item.filename}
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
            {item.type === 'video' ? formatDuration(item.duration) : item.type === 'website' ? 'Website' : 'Image'}
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItem(item.id);
          }}
          className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/20 transition-all text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    );
  };

  return (
    <div className="absolute left-4 top-4 bottom-24 w-[300px] z-30 glass-panel glow-border-cyan rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-left-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <h3 className="text-xs font-semibold font-mono tracking-[0.2em] uppercase text-primary glow-text">
          Media Library
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg hover:bg-secondary/60 transition-all text-primary hover:text-primary/80"
            title="Add files"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlaylist}
            className="p-1.5 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-foreground"
          >
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

      {/* Drop Zone */}
      <div
        className={`mx-4 mt-4 rounded-xl drop-zone flex flex-col items-center justify-center p-4 cursor-pointer transition-all ${
          isDragOver ? 'border-primary bg-primary/5 scale-[1.02]' : ''
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="w-5 h-5 text-muted-foreground mb-1.5" />
        <p className="text-xs text-muted-foreground">Drag & Drop Media Here</p>
        <p className="text-[10px] text-muted-foreground/50 mt-0.5">MP4, WebM, Images</p>
      </div>

      {/* Playlist items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 mt-2">
        {playlist.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-xs text-muted-foreground/50">
            No media in queue
          </div>
        ) : (
          <>
            {/* Ungrouped items */}
            {ungrouped.map(({ item, index }) => renderItem(item, index))}

            {/* Folder groups */}
            {folders.map((folder) => {
              const isExpanded = expandedFolders.has(folder.name);
              const hasActiveItem = folder.items.some(({ index }) => index === activeIndex);

              return (
                <div key={folder.name} className="mt-1">
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl transition-all text-left ${
                      hasActiveItem ? 'text-primary' : 'text-foreground/70 hover:text-foreground/90'
                    } hover:bg-secondary/40`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                    )}
                    {isExpanded ? (
                      <FolderOpen className="w-4 h-4 flex-shrink-0 text-accent/70" />
                    ) : (
                      <FolderClosed className="w-4 h-4 flex-shrink-0 text-accent/70" />
                    )}
                    <span className="text-xs font-medium truncate">{folder.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                      {folder.items.length}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="ml-3 pl-3 border-l border-border/30 space-y-0.5 mt-0.5">
                      {folder.items.map(({ item, index }) => renderItem(item, index))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
