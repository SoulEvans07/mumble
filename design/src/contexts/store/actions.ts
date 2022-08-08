import { action } from 'typesafe-actions';
import { LibraryTab } from './types';

export const clearData = () => action('mumble.io/clear-data');

export const changePlayerVisibility = (visible: boolean) => action('mumle.io/player/changeVisibility', { visible });

export const setActiveLibraryTab = (tab: LibraryTab) => action('mumble.io/library/setActiveTab', { tab });
