import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';

import { initialStoreData, StoreData } from './types';
import * as actions from './actions';

export function rootReducer(state: StoreData, action: ActionType<typeof actions>): StoreData {
  switch (action.type) {
    case 'mumle.io/player/changeVisibility':
      return produce(state, draft => {
        draft.player.isVisible = action.payload.visible;
      });
    case 'mumble.io/clear-data':
      return initialStoreData;
    default:
      return state;
  }
}
