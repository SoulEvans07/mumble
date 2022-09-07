import { playerActions } from './index';
import { createAppAsyncThunk } from '../helpers';
import { selectCurrentUnsafe } from './selectors';

// TODO: solve circular dependency issues cased by the idiotic @reduxjs/toolkit
const resetTrackTrashold = 0.2;
export const playPrevOrReset = createAppAsyncThunk('player/playPrevOrReset', (_: void, { getState, dispatch }) => {
  const { playbackPosition, track } = selectCurrentUnsafe(getState());

  const shouldReset = playbackPosition / track.duration > resetTrackTrashold;
  if (shouldReset) dispatch(playerActions.resetCurrent());
  else dispatch(playerActions.playPrev());
});
