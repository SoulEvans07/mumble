import { StoreData } from './types';

export const getPlayerSlice = (store: StoreData) => store.player;
export const getPlayerVisibility = (store: StoreData) => getPlayerSlice(store).isVisible;

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
