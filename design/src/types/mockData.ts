import { Album, Artist, Playlist, Track } from './model';

const kenAshcorp = new Artist('Ken Ashcorp');
const desRocs = new Artist('Des Rocs');
const rosenfeld = new Artist('Rosenfeld');
const royalRepublic = new Artist('Royal Republic');

export const artists: Artist[] = [kenAshcorp, desRocs, rosenfeld, royalRepublic];

const body = new Album('Body', rosenfeld, '/images/album-covers/body.jpg');
const dangerousWoman = new Album('Dangerous Woman', rosenfeld);
const takeMeHome = new Album('Take Me Home', kenAshcorp, '/images/album-covers/take-me-home.png');
const clubMajesty = new Album('Club Majesty', royalRepublic, '/images/album-covers/club-majesty.jpg');

export const albums: Album[] = [body, dangerousWoman, takeMeHome, clubMajesty];

const bodyTrack = new Track('body.mp3', 'Body', body);
const dangerousWomanTrack = new Track('dangerous woman.mp3', 'Dangerous Woman', dangerousWoman);
const takeMeHomeTrack = new Track('take me home.mp3', 'Take Me Home', takeMeHome);
const boomerangTrack = new Track('boomerang.mp3', 'Boomerang', clubMajesty);
const magicTrack = new Track('magic.mp3', 'Magic', clubMajesty);
const fireManTrack = new Track('fire man.mp3', 'Fire Man', clubMajesty);

export const tracks: Track[] = [
  bodyTrack,
  dangerousWomanTrack,
  takeMeHomeTrack,
  boomerangTrack,
  magicTrack,
  fireManTrack,
];

const moodPlaylist = new Playlist('mood.', [bodyTrack, takeMeHomeTrack, magicTrack, fireManTrack]);
const emptyPlaylist = new Playlist('empty', []);

export const playlists: Playlist[] = [moodPlaylist, emptyPlaylist];
