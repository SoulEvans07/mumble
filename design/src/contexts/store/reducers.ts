import { ActionType } from 'typesafe-actions';

import { initialStoreData, StoreData } from './types';
import * as actions from './actions';

export function rootReducer(state: StoreData, action: ActionType<typeof actions>): StoreData {
  switch (action.type) {
    case 'mumble.io/clear-data':
      return initialStoreData;
    default:
      return state;
  }
}
