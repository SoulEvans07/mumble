import { RootState } from '../index';

const selectLibraryDomain = (state: RootState) => state.library;

export const selectTracks = (state: RootState) => selectLibraryDomain(state).Tracks;
export const selectPlaylists = (state: RootState) => selectLibraryDomain(state).Playlists;
export const selectAlbums = (state: RootState) => selectLibraryDomain(state).Albums;
