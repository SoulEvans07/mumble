import { Track } from '../../types/model';
import { PlayerSLice } from './types';

export function currentFrom(track: Track, index: number): PlayerSLice['current'] {
  return {
    trackIndex: index,
    playbackPosition: 0,
    isPlaying: false,
  };
}
