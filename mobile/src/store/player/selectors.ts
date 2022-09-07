import { Track } from '../../types/model';
import { RootState } from '../index';

const selectPlayerDomain = (state: RootState) => state.player;

export const selectPlayerVisibility = (state: RootState) => {
  const { isVisible, current } = selectPlayerDomain(state);
  return isVisible && !!current;
};

const placeholderTrackId = 'placeholder-track';
const placeholderTrack: Track = {
  _type: 'track',
  id: placeholderTrackId,
  title: 'Loading Track...',
  duration: 0,
  asset: {
    id: placeholderTrackId,
    filename: `${placeholderTrackId}.mp3`,
    uri: `file:///dev/null/${placeholderTrackId}.mp3`,
    mediaType: 'audio',
    mediaSubtypes: undefined,
    width: 0,
    height: 0,
    creationTime: 0,
    modificationTime: 0,
    duration: 0,
    albumId: undefined,
  },
};

export const selectCurrentTrackPlaceholder = (state: RootState) => {
  const { current, queue } = selectPlayerDomain(state);
  if (!current) return placeholderTrack;
  return queue[current.trackIndex];
};

export const selectCurrent = (state: RootState) => {
  const { current, queue } = selectPlayerDomain(state);
  if (!current) return null;
  return { ...current, track: queue[current.trackIndex] };
};

export const selectCurrentTrack = (state: RootState) => {
  const { current, queue } = selectPlayerDomain(state);
  if (!current) return null;
  return queue[current.trackIndex];
};
