import { create } from 'zustand';

export interface MediaItem {
  id: string;
  filename: string;
  type: 'video' | 'image';
  blobUrl: string;
}

interface PlanetariumState {
  // Playlist
  playlist: MediaItem[];
  activeIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;

  // Settings
  distance: number;      // camera Z: -5 to 5
  screenSize: number;    // mesh scale: 0.5 to 3
  curveAmount: number;   // thetaLength in degrees: 60 to 360

  // UI
  showPlaylist: boolean;
  showSettings: boolean;

  // Actions
  addFiles: (files: File[]) => void;
  removeItem: (id: string) => void;
  setActiveIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setDistance: (d: number) => void;
  setScreenSize: (s: number) => void;
  setCurveAmount: (c: number) => void;
  togglePlaylist: () => void;
  toggleSettings: () => void;
}

let idCounter = 0;

export const usePlanetariumStore = create<PlanetariumState>((set, get) => ({
  playlist: [],
  activeIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,

  distance: 0,
  screenSize: 1,
  curveAmount: 180,

  showPlaylist: false,
  showSettings: false,

  addFiles: (files) => {
    const newItems: MediaItem[] = files.map((file) => {
      const isVideo = file.type.startsWith('video/');
      return {
        id: `media-${++idCounter}`,
        filename: file.name,
        type: isVideo ? 'video' : 'image',
        blobUrl: URL.createObjectURL(file),
      };
    });
    const state = get();
    const wasEmpty = state.playlist.length === 0;
    set({
      playlist: [...state.playlist, ...newItems],
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
  setDistance: (d) => set({ distance: d }),
  setScreenSize: (s) => set({ screenSize: s }),
  setCurveAmount: (c) => set({ curveAmount: c }),
  togglePlaylist: () => set((s) => ({ showPlaylist: !s.showPlaylist })),
  toggleSettings: () => set((s) => ({ showSettings: !s.showSettings })),
}));
