import { Track } from '../../types/model';

export type RepeatMode = 'repeat' | 'single' | 'no-repeat';

export interface PlayerState {
  isVisible: boolean;
  current: {
    trackIndex: number;
    isPlaying: boolean;
    playbackPosition: number; // millisec
  } | null;
  repeat: RepeatMode;
  shuffle: boolean;
  queue: Track[];
}
