import TrackPlayer from 'react-native-track-player';

import { playerSlice } from './index';
import { createThunk } from '../helpers';
import { selectCurrentUnsafe, selectPlayerDomain } from './selectors';
import { SetQueuePayload } from './types';

const resetCurrent = createThunk((_: void, { getState, dispatch }) => {
  selectCurrentUnsafe(getState());
  TrackPlayer.seekTo(0);
  dispatch(playerActions.setSeekPosition(0));
});

const playPrev = createThunk((_: void, { getState, dispatch }) => {
  const { trackIndex } = selectCurrentUnsafe(getState());
  const { queue } = selectPlayerDomain(getState());

  const prevIndex = (queue.length + trackIndex - 1) % queue.length;
  TrackPlayer.skip(prevIndex);
  dispatch(playerActions.setTrack(prevIndex));
});

const playNext = createThunk((_: void, { getState, dispatch }) => {
  const { trackIndex } = selectCurrentUnsafe(getState());
  const { queue } = selectPlayerDomain(getState());

  const nextIndex = (trackIndex + 1) % queue.length;
  TrackPlayer.skip(nextIndex);
  dispatch(playerActions.setTrack(nextIndex));
});

const resetTrackTrashold = 0.2;
const playPrevOrReset = createThunk((_: void, { getState, dispatch }) => {
  const { playbackPosition, track } = selectCurrentUnsafe(getState());

  const shouldReset = playbackPosition / track.duration > resetTrackTrashold;
  if (shouldReset) dispatch(resetCurrent());
  else dispatch(playPrev());
});

const playOrPause = createThunk((_: void, { dispatch, getState }) => {
  const { isPlaying } = selectCurrentUnsafe(getState());

  if (isPlaying) {
    TrackPlayer.pause();
    dispatch(playerActions.pause());
  } else {
    TrackPlayer.play();
    dispatch(playerActions.play());
  }
});

const startQueue = createThunk((payload: SetQueuePayload, { dispatch, getState }) => {
  const { queue, index } = payload;

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

  dispatch(playerActions.setQueue(payload));
});

export const playerActions = {
  ...playerSlice.actions,
  playPrevOrReset,
  playOrPause,
  playPrev,
  playNext,
  startQueue,
};
