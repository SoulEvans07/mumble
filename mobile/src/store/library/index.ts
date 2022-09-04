import { createSlice } from '@reduxjs/toolkit';

import { LibraryState } from './types';
import { initLoadable } from '../../utils/loadableData';
import { fetchTracks } from './thunk.actions';
import { Track } from '../../types/model';
import { AssetWatcher } from './helpers';

const initialState: LibraryState = {
  activeTab: 'Tracks',
  includedFolders: ['file:///storage/emulated/0/Music/'],
  excludedFolders: ['file:///storage/emulated/0/Android/media/'],
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

      const assetWatcher = new AssetWatcher(state.includedFolders, state.excludedFolders);
      state.tracks.data = assets.reduce((map: Record<string, Track>, asset) => {
        if (!assetWatcher.isWatched(asset)) return map;
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
