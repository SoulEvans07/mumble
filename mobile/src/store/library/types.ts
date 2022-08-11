import { Album, Artist, Playlist, Track } from '../../types/model';

export type LibraryTab = 'Tracks' | 'Artists' | 'Albums' | 'Playlists';

export interface LibraryState {
  activeTab: LibraryTab;

  tracks: Record<string, Track>;
  artists: Record<string, Artist>;
  albums: Record<string, Album>;
  playlists: Record<string, Playlist>;
}
