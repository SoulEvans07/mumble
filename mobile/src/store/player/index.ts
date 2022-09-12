import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TrackPlayer from 'react-native-track-player';
import { playPrevOrReset } from './actions';

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

        // const track = state.queue[state.current.trackIndex];
        // TrackPlayer.add({
        //   url: track.asset.uri,
        //   title: track.title,
        //   artist: 'Unknown artist',
        //   duration: track.duration,
        // });
        // TrackPlayer.play();
      } else {
        state.current.isPlaying = !state.current.isPlaying;
        if (state.current.isPlaying) TrackPlayer.play();
        else TrackPlayer.pause();
      }
    },
    playNext(state) {
      if (!state.current) return;
      if (!state.queue.length) return;
      state.current.trackIndex = (state.current.trackIndex + 1) % state.queue.length;
      state.current.playbackPosition = 0;
      TrackPlayer.skipToNext();
    },
    playPrev(state) {
      if (!state.current) return;
      if (!state.queue.length) return;
      state.current.trackIndex = (state.queue.length + state.current.trackIndex - 1) % state.queue.length;
      state.current.playbackPosition = 0;
      TrackPlayer.skipToPrevious();
    },
    resetCurrent(state) {
      if (!state.current) return;
      state.current.playbackPosition = 0;
      TrackPlayer.seekTo(0);
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
    jumpTo(state, action: PayloadAction<number>) {
      if (!state.current) return;
      state.current.trackIndex = action.payload;
    },
    setQueue(state, action: PayloadAction<SetQueuePayload>) {
      const { queue, index } = action.payload;
      state.queue = queue;
      state.current = currentFrom(queue[index], index);
      state.isVisible = true;

      TrackPlayer.reset();
      TrackPlayer.add(
        queue.map(track => ({
          url: track.asset.uri,
          title: track.title,
          artist: 'Unknown artist',
          duration: track.duration,
        }))
      );
      TrackPlayer.skip(index);
      TrackPlayer.play();
    },
  },
});

export const playerActions = {
  ...playerSlice.actions,
  playPrevOrReset,
};
