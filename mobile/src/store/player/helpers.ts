import { Track } from '../../types/model';
import { PlayerState } from './types';

export function currentFrom(track: Track, index: number): PlayerState['current'] {
  return {
    trackIndex: index,
    playbackPosition: 0,
    isPlaying: true,
  };
}
