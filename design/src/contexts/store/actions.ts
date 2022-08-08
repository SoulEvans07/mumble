import { action } from 'typesafe-actions';
import { Album, Artist, Playlist, Track } from '../../types/model';
import { LibraryTab } from './types';

export const clearData = () => action('mumble.io/clear-data');

export const changePlayerVisibility = (visible: boolean) => action('mumle.io/player/changeVisibility', { visible });

export const setActiveLibraryTab = (tab: LibraryTab) => action('mumble.io/library/setActiveTab', { tab });

export const queueTracks = (track: Track) => action('mumble.io/player/queue/tracks', { track });
export const queueAlbum = (album: Album) => action('mumble.io/player/queue/album', { album });
export const queueArtist = (artist: Artist) => action('mumble.io/player/queue/artist', { artist });
export const queuePlaylist = (playlist: Playlist) => action('mumble.io/player/queue/playlist', { playlist });

export const resumePlay = () => action('mumle.io/player/resume');
export const pausePlay = () => action('mumle.io/player/pause');