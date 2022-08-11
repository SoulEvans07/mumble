import { createSlice } from '@reduxjs/toolkit';
import { LibraryState } from './types';

const initialState: LibraryState = {
  activeTab: 'Tracks',
  tracks: {},
  albums: {},
  artists: {},
  playlists: {},
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
});
