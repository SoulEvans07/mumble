import { RootState } from '../index';

const selectLibraryDomain = (state: RootState) => state.library;

export const selectTracks = (state: RootState) => selectLibraryDomain(state).tracks;
export const selectPlaylists = (state: RootState) => selectLibraryDomain(state).playlists;
export const selectAlbums = (state: RootState) => selectLibraryDomain(state).albums;
