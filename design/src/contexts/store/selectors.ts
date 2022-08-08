import { StoreData } from './types';

export const getLibrarySlice = (store: StoreData) => store.library;
export const getTracks = (store: StoreData) => getLibrarySlice(store).tracks;
export const getArtists = (store: StoreData) => getLibrarySlice(store).artists;
export const getAlbums = (store: StoreData) => getLibrarySlice(store).albums;
export const getPlaylists = (store: StoreData) => getLibrarySlice(store).playlists;
export const getActiveLibraryTab = (store: StoreData) => getLibrarySlice(store).activeTab;
export const getLibraryTabs = (store: StoreData) => {
  const { tracks, artists, albums, playlists } = getLibrarySlice(store);

  return [
    { title: 'Tracks', items: Object.values(tracks) },
    { title: 'Artists', items: Object.values(artists) },
    { title: 'Albums', items: Object.values(albums) },
    { title: 'Playlists', items: Object.values(playlists) },
  ] as const;
};

export const getPlayerSlice = (store: StoreData) => store.player;
export const getPlayerVisibility = (store: StoreData) => getPlayerSlice(store).isVisible;
export const getPlayerBarState = (store: StoreData) => {
  const { current, queue } = getPlayerSlice(store);
  if (!queue.length) return { hasPlaylist: false as const, isPlaying: false as const };
  if (!current) throw new Error("No track selected but has queue");

  const track = queue[current.trackIndex];
  const artists = getArtists(store);
  const artist = !!track.artistId ? artists[track.artistId] : undefined;

  return {
    hasPlaylist: true as const,
    isPlaying: current.isPlaying,
    track,
    artist,
    percent: current.playbackPosition / track.duration * 100,
    duration: track.duration,
    position: current.playbackPosition,
  };
};
