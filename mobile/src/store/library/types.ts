import { Album, Artist, Playlist, Track } from '../../types/model';
import { Loadable } from '../../utils/loadableData';

export type LibraryTab = 'Tracks' | 'Artists' | 'Albums' | 'Playlists';

export interface LibraryState {
  activeTab: LibraryTab;

  tracks: Loadable<Record<string, Track>>;
  artists: Loadable<Record<string, Artist>>;
  albums: Loadable<Record<string, Album>>;
  playlists: Loadable<Record<string, Playlist>>;
}
