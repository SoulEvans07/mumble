import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { LibrarySlice, LibraryTab, LibraryTabLists, libraryTabs } from './types';
import { initLoadable, LoadableStatus } from '../../utils/loadableData';

const initialState: LibrarySlice = {
  activeTab: 'Tracks',
  visibleTabs: Array.from(libraryTabs),
  includedFolders: ['file:///storage/emulated/0/Music/'],
  excludedFolders: ['file:///storage/emulated/0/Android/media/'],
  Tracks: initLoadable({}),
  Albums: initLoadable({}),
  Artists: initLoadable({}),
  Playlists: initLoadable({}),
};

interface TabListErrorPayload {
  tab: LibraryTab;
  error: string;
}

interface TabListDataSetterPayload<T extends LibraryTab> {
  data: LibraryTabLists[T]['data'];
}

function createSetListDataReducer<T extends LibraryTab>(tab: T) {
  return function (state: Draft<LibrarySlice>, action: PayloadAction<TabListDataSetterPayload<T>>) {
    state[tab].status = 'succeeded';
    // TODO: find a way to solve WritableDraft type mismatch @adam.szi
    // @ts-ignore
    state[tab].data = action.payload.data;
  };
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setListPending(state, action: PayloadAction<LibraryTab>) {
      state[action.payload].status = 'loading';
    },
    setListFailed(state, action: PayloadAction<TabListErrorPayload>) {
      const { tab, error } = action.payload;
      state[tab].error = error;
    },
    setTracksList: createSetListDataReducer('Tracks'),
    setAlbumsList: createSetListDataReducer('Albums'),
    setArtistsList: createSetListDataReducer('Artists'),
    setPlaylistsList: createSetListDataReducer('Playlists'),
  },
});
