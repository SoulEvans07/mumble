import TrackPlayer from 'react-native-track-player';

import { playerActions } from './index';
import { createThunk } from '../helpers';
import { selectCurrentUnsafe } from './selectors';

const resetTrackTrashold = 0.2;
export const playPrevOrReset = createThunk((_: void, { getState, dispatch }) => {
  const { playbackPosition, track } = selectCurrentUnsafe(getState());

  const shouldReset = playbackPosition / track.duration > resetTrackTrashold;
  if (shouldReset) dispatch(playerActions.resetCurrent());
  else dispatch(playerActions.playPrev());
});

export const playOrPause = createThunk((_: void, { dispatch, getState }) => {
  const { isPlaying } = selectCurrentUnsafe(getState());

  if (isPlaying) {
    dispatch(playerActions.pause());
    TrackPlayer.pause();
  } else {
    dispatch(playerActions.play());
    TrackPlayer.play();
  }
});
