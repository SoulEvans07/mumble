import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';

import { initialStoreData, StoreData } from './types';
import * as actions from './actions';

export function rootReducer(state: StoreData, action: ActionType<typeof actions>): StoreData {
  switch (action.type) {
    case 'mumble.io/library/setActiveTab':
      return produce(state, draft => {
        draft.library.activeTab = action.payload.tab;
      });
    case 'mumble.io/player/resume':
      return produce(state, draft => {
        if (!draft.player.current) throw new Error('Tried to resume without song selected!');
        draft.player.current.isPlaying = true;
      });
    case 'mumble.io/player/pause':
      return produce(state, draft => {
        if (!draft.player.current) throw new Error('Tried to pause without song selected!');
        draft.player.current.isPlaying = false;
      });
    case 'mumle.io/player/changeVisibility':
      return produce(state, draft => {
        draft.player.isVisible = action.payload.visible;
      });
    case 'mumble.io/player/queue/tracks':
      return produce(state, draft => {
        draft.player.queue = Object.values(draft.library.tracks);
        draft.player.current = {
          isPlaying: true,
          trackIndex: draft.player.queue.findIndex(t => t.id === action.payload.track.id),
          playbackPosition: 55000,
        };
      });
    case 'mumble.io/player/queue/prev':
      return produce(state, draft => {
        if (!draft.player.current) throw new Error('Tried to prev without song selected!');
        if (
          draft.player.current.playbackPosition / draft.player.queue[draft.player.current.trackIndex].duration <=
          0.1
        ) {
          draft.player.current.trackIndex =
            (draft.player.queue.length + draft.player.current.trackIndex - 1) % draft.player.queue.length;
        } else {
          draft.player.current.playbackPosition = 0;
        }
      });
    case 'mumble.io/player/queue/next':
      return produce(state, draft => {
        if (!draft.player.current) throw new Error('Tried to next without song selected!');
        draft.player.current.trackIndex = (draft.player.current.trackIndex + 1) % draft.player.queue.length;
      });
    case 'mumble.io/player/shuffle/toggle':
      return produce(state, draft => {
        draft.player.shuffle = !draft.player.shuffle;
      });
    case 'mumble.io/player/setRepeatMode':
      return produce(state, draft => {
        draft.player.repeat = action.payload.mode;
      });
    case 'mumble.io/clear-data':
      return initialStoreData;
    default:
      return state;
  }
}
