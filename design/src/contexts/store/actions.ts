import { action } from 'typesafe-actions';

export const clearData = () => action('mumble.io/clear-data');

export const changePlayerVisibility = (visible: boolean) => action('mumle.io/player/changeVisibility', { visible });
