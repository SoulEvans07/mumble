import { StoreData } from './types';

export const getPlayerDomain = (store: StoreData) => store.player;

export const getPlayerVisibility = (store: StoreData) => getPlayerDomain(store).isVisible;
