import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentFrom } from './helpers';
import { PlayerState, SetQueuePayload } from './types';

const initialState: PlayerState = {
  isVisible: false,
  current: null,
  queue: [],
  repeat: 'repeat',
  shuffle: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setVisibility(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setQueue(state, action: PayloadAction<SetQueuePayload>) {
      const { queue, index } = action.payload;
      state.queue = queue;
      state.current = currentFrom(queue[index], index);
      state.isVisible = true;
    },
  },
});

export const playerActions = {
  ...playerSlice.actions,
};
