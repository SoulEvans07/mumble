import TrackPlayer, { Event } from 'react-native-track-player';

export default async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('remote-play');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('remote-pause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('remote-next');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('remote-previous');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log('remote-stop');
    TrackPlayer.removeUpcomingTracks();
  });
}
