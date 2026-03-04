import { create } from 'zustand';

export interface MediaItem {
  id: string;
  filename: string;
  type: 'video' | 'image';
  blobUrl: string;
  duration?: number;
  thumbnailUrl?: string;
}

interface PlanetariumState {
  // Playlist
  playlist: MediaItem[];
  activeIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;

  // Settings
  distance: number;
  screenSize: number;
  curveAmount: number;

  // UI
  showPlaylist: boolean;
  showSettings: boolean;

  // Actions
  addFiles: (files: File[]) => void;
  loadSlides: (items: MediaItem[]) => void;
  removeItem: (id: string) => void;
  setActiveIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (v: number) => void;
  setDistance: (d: number) => void;
  setScreenSize: (s: number) => void;
  setCurveAmount: (c: number) => void;
  resetSettings: () => void;
  togglePlaylist: () => void;
  toggleSettings: () => void;
  updateItemDuration: (id: string, duration: number) => void;
}

let idCounter = 0;

const DEFAULT_SETTINGS = {
  distance: 0,
  screenSize: 1,
  curveAmount: 180,
};

export const usePlanetariumStore = create<PlanetariumState>((set, get) => ({
  playlist: [],
  activeIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,

  ...DEFAULT_SETTINGS,

  showPlaylist: false,
  showSettings: false,

  addFiles: (files) => {
    const newItems: MediaItem[] = files.map((file) => {
      const isVideo = file.type.startsWith('video/');
      const blobUrl = URL.createObjectURL(file);
      
      const item: MediaItem = {
        id: `media-${++idCounter}`,
        filename: file.name,
        type: isVideo ? 'video' : 'image',
        blobUrl,
      };

      // Generate thumbnail for videos
      if (isVideo) {
        const video = document.createElement('video');
        video.src = blobUrl;
        video.muted = true;
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          const duration = video.duration;
          get().updateItemDuration(item.id, duration);
          // Seek to 1s for thumbnail
          video.currentTime = Math.min(1, duration * 0.1);
        };
        video.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 120;
          canvas.height = 68;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, 120, 68);
            const thumbUrl = canvas.toDataURL('image/jpeg', 0.6);
            set((s) => ({
              playlist: s.playlist.map((p) =>
                p.id === item.id ? { ...p, thumbnailUrl: thumbUrl } : p
              ),
            }));
          }
          video.remove();
        };
      }

      return item;
    });
    const state = get();
    const wasEmpty = state.playlist.length === 0;
    set({
      playlist: [...state.playlist, ...newItems],
      activeIndex: wasEmpty ? 0 : state.activeIndex,
    });
  },

  loadSlides: (items) => {
    const state = get();
    const wasEmpty = state.playlist.length === 0;
    set({
      playlist: [...state.playlist, ...items],
      activeIndex: wasEmpty ? 0 : state.activeIndex,
    });
  },

  removeItem: (id) => {
    const state = get();
    const item = state.playlist.find((i) => i.id === id);
    if (item) URL.revokeObjectURL(item.blobUrl);
    const newPlaylist = state.playlist.filter((i) => i.id !== id);
    let newIndex = state.activeIndex;
    if (newPlaylist.length === 0) newIndex = -1;
    else if (newIndex >= newPlaylist.length) newIndex = newPlaylist.length - 1;
    set({ playlist: newPlaylist, activeIndex: newIndex });
  },

  setActiveIndex: (index) => set({ activeIndex: index, currentTime: 0, isPlaying: false }),
  nextTrack: () => {
    const { playlist, activeIndex } = get();
    if (playlist.length === 0) return;
    set({ activeIndex: (activeIndex + 1) % playlist.length, currentTime: 0 });
  },
  prevTrack: () => {
    const { playlist, activeIndex } = get();
    if (playlist.length === 0) return;
    set({ activeIndex: (activeIndex - 1 + playlist.length) % playlist.length, currentTime: 0 });
  },
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (v) => set({ volume: v }),
  setDistance: (d) => set({ distance: d }),
  setScreenSize: (s) => set({ screenSize: s }),
  setCurveAmount: (c) => set({ curveAmount: c }),
  resetSettings: () => set(DEFAULT_SETTINGS),
  togglePlaylist: () => set((s) => ({ showPlaylist: !s.showPlaylist })),
  toggleSettings: () => set((s) => ({ showSettings: !s.showSettings })),
  updateItemDuration: (id, duration) =>
    set((s) => ({
      playlist: s.playlist.map((p) =>
        p.id === id ? { ...p, duration } : p
      ),
    })),
}));
