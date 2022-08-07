export interface StoreData {}

export type StoreSelector<T> = (store: StoreData) => T;

export const initialStoreData: StoreData = {};
