import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from 'expo-media-library';

export const storeAudioForNextOpening = async (audio: MediaLibrary.Asset, index: number, lastPosition?: number) => {
  await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio: { ...audio, lastPosition }, index }));
};
