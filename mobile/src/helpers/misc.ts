import AsyncStorage from '@react-native-async-storage/async-storage';
import { MediaAsset } from '../types/media';

export async function storeAudioForNextOpening(audio: MediaAsset, index: number, lastPosition?: number) {
  await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio: { ...audio, lastPosition }, index }));
}

export function convertTime(minutes: number) {
  const hrs = minutes / 60;
  const minute = hrs.toString().split('.')[0];
  const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
  const sec = Math.ceil((60 * percent) / 100);
  if (parseInt(minute) < 10 && sec < 10) {
    return `0${minute}:0${sec}`;
  }

  if (sec == 60) {
    return `${minute + 1}:00`;
  }

  if (parseInt(minute) < 10) {
    return `0${minute}:${sec}`;
  }

  if (sec < 10) {
    return `${minute}:0${sec}`;
  }

  return `${minute}:${sec}`;
}
