import { createSlice } from '@reduxjs/toolkit';

import { LibraryState } from './types';
import { initLoadable } from '../../utils/loadableData';
import { fetchTracks } from './thunk.actions';
import { Track } from '../../types/model';

const initialState: LibraryState = {
  activeTab: 'Tracks',
  tracks: initLoadable({}),
  albums: initLoadable({}),
  artists: initLoadable({}),
  playlists: initLoadable({}),
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTracks.pending, state => {
      state.tracks.status = 'loading';
    });

    builder.addCase(fetchTracks.fulfilled, (state, { payload: assets }) => {
      state.tracks.status = 'succeeded';
      state.tracks.data = assets.reduce((map: Record<string, Track>, asset) => {
        return {
          ...map,
          [asset.id]: Track.from(asset),
        };
      }, {});
    });

    builder.addCase(fetchTracks.rejected, (state, { error }) => {
      state.tracks.status = 'failed';
      state.tracks.error = error.message;
    });
  },
});

export const libraryActions = {
  ...librarySlice.actions,
  fetchLibrary: fetchTracks,
};
