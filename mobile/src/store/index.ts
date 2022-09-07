import { configureStore } from '@reduxjs/toolkit';

import { librarySlice } from './library';
import { playerSlice } from './player';

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    library: librarySlice.reducer,
  },
});

export type AppGetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppGetState>;

export type AppThunkApiConfig = { state: RootState; dispatch: AppDispatch };
