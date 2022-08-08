import { albums, artists, playlists, tracks } from '../../types/mockData';
import { Album, Artist, Playlist, Track } from '../../types/model';

export type LibraryTab = 'Tracks' | 'Artists' | 'Albums' | 'Playlists';

export interface LibrarySlice {
  activeTab: LibraryTab;
  tracks: Record<string, Track>;
  artists: Record<string, Artist>;
  albums: Record<string, Album>;
  playlists: Record<string, Playlist>;
}

export type RepeatMode = 'repeat' | 'single' | 'no-repeat';
export interface PlayerSlice {
  isVisible: boolean;
  current: {
    trackIndex: number;
    isPlaying: boolean;
    playbackPosition: number; // millisec
  } | null;
  repeat: RepeatMode;
  shuffle: boolean;
  queue: Track[];
}

export interface StoreData {
  player: PlayerSlice;
  library: LibrarySlice;
}

export type StoreSelector<T> = (store: StoreData) => T;

export const initialStoreData: StoreData = {
  player: {
    isVisible: false,
    current: null,
    queue: [],
    repeat: 'repeat',
    shuffle: false,
  },
  library: {
    activeTab: 'Tracks',
    tracks: tracks.reduce((acc: LibrarySlice['tracks'], curr) => ({ ...acc, [curr.id]: curr }), {}),
    artists: artists.reduce((acc: LibrarySlice['artists'], curr) => ({ ...acc, [curr.id]: curr }), {}),
    albums: albums.reduce((acc: LibrarySlice['albums'], curr) => ({ ...acc, [curr.id]: curr }), {}),
    playlists: playlists.reduce((acc: LibrarySlice['playlists'], curr) => ({ ...acc, [curr.id]: curr }), {}),
  },
};
