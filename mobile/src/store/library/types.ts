import { Album, Artist, Playlist, Track } from '../../types/model';
import { Loadable } from '../../utils/loadableData';

export const libraryTabs = ['Tracks', 'Playlists', 'Artists', 'Albums'] as const;
export type LibraryTab = typeof libraryTabs[number];

export interface LibraryTabData {
  Tracks: Track;
  Artists: Artist;
  Albums: Album;
  Playlists: Playlist;
}

interface LibraryState {
  activeTab: LibraryTab;
  visibleTabs: LibraryTab[];
}

interface LibrarySettings {
  includedFolders: string[];
  excludedFolders: string[];
}

export type LibraryTabLists = {
  [tab in LibraryTab]: Loadable<Record<string, LibraryTabData[tab]>>;
};

export type LibrarySlice = LibraryState & LibrarySettings & LibraryTabLists;
