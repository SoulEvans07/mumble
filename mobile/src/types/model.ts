import { MediaAsset } from './media';
import { Random } from '../utils/Random';
import { Longest } from 'reselect/es/types';

export class Artist {
  _type = 'artist';
  id: string = Random.uuid();

  constructor(public name: string) {}
}

export function isArtist(obj: any): obj is Artist {
  return '_type' in obj && obj._type === 'artist';
}

export class Album {
  _type = 'album';
  id: string = Random.uuid();
  artistId: Artist['id'];

  constructor(public title: string, author: Artist, public coverImage?: string) {
    this.artistId = author.id;
  }
}

export function isAlbum(obj: any): obj is Album {
  return '_type' in obj && obj._type === 'album';
}

export interface Track {
  _type: 'track';
  id: string;
  title: string;
  duration: number;
  asset: MediaAsset;
  albumId?: Album['id'];
  artistId?: Artist['id'];
}

export class Track {
  static from(asset: MediaAsset): Track {
    const dot = asset.filename.lastIndexOf('.');
    return {
      asset,
      _type: 'track',
      id: asset.id,
      title: asset.filename.slice(0, dot),
      duration: asset.duration * 1000,
      albumId: undefined,
      artistId: undefined,
    };
  }
}

export function isTrack(obj: any): obj is Track {
  return '_type' in obj && obj._type === 'track';
}

export class Playlist {
  _type = 'playlist';
  id: string;
  items: Track['id'][];

  constructor(public title: string, items: Track[] = []) {
    this.id = Random.uuid();
    this.items = items.map(i => i.id);
  }
}

export function isPlaylist(obj: any): obj is Playlist {
  return '_type' in obj && obj._type === 'playlist';
}
