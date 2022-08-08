export interface PlayerDomain {
  isVisible: boolean;
}

export interface StoreData {
  player: PlayerDomain;
}

export type StoreSelector<T> = (store: StoreData) => T;

export const initialStoreData: StoreData = {
  player: {
    isVisible: false,
  }
};
