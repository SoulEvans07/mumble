import { Track } from '../../types/model';

export type RepeatMode = 'repeat' | 'single' | 'no-repeat';

export type Queue = Track[];

export interface PlayerSLice {
  isVisible: boolean;
  current: {
    trackIndex: number;
    isPlaying: boolean;
    playbackPosition: number; // millisec
  } | null;
  repeat: RepeatMode;
  shuffle: boolean;
  queue: Queue;
}

export interface SetQueuePayload {
  queue: Queue;
  index: number;
}
