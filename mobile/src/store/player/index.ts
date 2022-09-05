import { createSlice, isPlain, PayloadAction } from '@reduxjs/toolkit';
import { currentFrom } from './helpers';
import { PlayerState, RepeatMode, SetQueuePayload } from './types';

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
    playOrPause(state) {
      if (state.queue.length === 0) return;
      if (!state.current) {
        state.current = {
          trackIndex: 0,
          playbackPosition: 0,
          isPlaying: true,
        };
      } else {
        state.current.isPlaying = !state.current.isPlaying;
      }
    },
    switchShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    setRepeatMode(state, action: PayloadAction<RepeatMode>) {
      state.repeat = action.payload;
    },
    setVisibility(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setSeekPosition(state, action: PayloadAction<number>) {
      if (!state.current) return;
      state.current.playbackPosition = action.payload;
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
