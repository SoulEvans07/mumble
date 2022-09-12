import TrackPlayer from 'react-native-track-player';

import { playerSlice } from './index';
import { createThunk } from '../helpers';
import { selectCurrentUnsafe, selectPlayerDomain } from './selectors';

const playPrev = createThunk((_: void, { getState, dispatch }) => {
  const { trackIndex } = selectCurrentUnsafe(getState());
  const { queue } = selectPlayerDomain(getState());

  const prevIndex = (queue.length + trackIndex - 1) % queue.length;
  dispatch(playerActions.setTrack(prevIndex));
  TrackPlayer.skip(prevIndex);
});

const playNext = createThunk((_: void, { getState, dispatch }) => {
  const { trackIndex } = selectCurrentUnsafe(getState());
  const { queue } = selectPlayerDomain(getState());

  const nextIndex = (trackIndex + 1) % queue.length;
  dispatch(playerActions.setTrack(nextIndex));
  TrackPlayer.skip(nextIndex);
});

const resetTrackTrashold = 0.2;
const playPrevOrReset = createThunk((_: void, { getState, dispatch }) => {
  const { playbackPosition, track } = selectCurrentUnsafe(getState());

  const shouldReset = playbackPosition / track.duration > resetTrackTrashold;
  if (shouldReset) dispatch(playerActions.resetCurrent());
  else dispatch(playPrev());
});

const playOrPause = createThunk((_: void, { dispatch, getState }) => {
  const { isPlaying } = selectCurrentUnsafe(getState());

  if (isPlaying) {
    dispatch(playerActions.pause());
    TrackPlayer.pause();
  } else {
    dispatch(playerActions.play());
    TrackPlayer.play();
  }
});

export const playerActions = {
  ...playerSlice.actions,
  playPrevOrReset,
  playOrPause,
  playPrev,
  playNext,
};
