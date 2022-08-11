import { Random } from '../utils/Random';

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

export class Track {
  _type = 'track';
  id: string;
  albumId?: Album['id'];
  artistId?: Artist['id'];

  constructor(public fileName: string, public title: string, public duration: number, album?: Album) {
    this.id = fileName;
    this.albumId = album?.id;
    this.artistId = album?.artistId;
  }
}

export function isTrack(obj: any): obj is Track {
  return '_type' in obj && obj._type === 'track';
}

export class Playlist {
  _type = 'playlist';
  id: string;
  items: Track['fileName'][];

  constructor(public title: string, items: Track[] = []) {
    this.id = Random.uuid();
    this.items = items.map(i => i.fileName);
  }
}

export function isPlaylist(obj: any): obj is Playlist {
  return '_type' in obj && obj._type === 'playlist';
}
