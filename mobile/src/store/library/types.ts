import { Album, Artist, Playlist, Track } from '../../types/model';
import { Loadable } from '../../utils/loadableData';

export const libraryTabs = ['Tracks', 'Playlists', 'Artists', 'Albums'] as const;
export type LibraryTab = typeof libraryTabs[number];

export interface LibraryState {
  activeTab: LibraryTab;
  includedFolders: string[];
  excludedFolders: string[];

  tracks: Loadable<Record<string, Track>>;
  artists: Loadable<Record<string, Artist>>;
  albums: Loadable<Record<string, Album>>;
  playlists: Loadable<Record<string, Playlist>>;
}
