import { createContext, PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataProvider } from 'recyclerlistview';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Alert } from 'react-native';
import { storeAudioForNextOpening } from '../../helpers/misc';
import { playNext } from '../../controllers/audioController';

export interface AudioState {
  audioFiles: MediaLibrary.Asset[];
  totalAudioCount: number;
  playList: any[];
  addToPlayList: null;
  permissionError: boolean;
  dataProvider: DataProvider;
  playbackObj: Audio.Sound;
  soundObj: AVPlaybackStatus | null;
  currentAudio: MediaLibrary.Asset | null;
  isPlaying: boolean;
  isPlayListRunning: boolean;
  activePlayList: {
    audios: any[];
    id: string;
    title: string;
  } | null;
  currentAudioIndex: number;
  playbackPosition: number | null;
  playbackDuration: null;
}

export interface AudioContext extends AudioState {
  updateState: (update: Partial<AudioState>) => void;
  loadPreviousAudio: () => Promise<void>;
  onPlaybackStatusUpdate: (playbackStatus: any) => Promise<any>;
}

const AudioSlice = createContext<AudioContext | undefined>(undefined);

export const AudioConsumer = AudioSlice.Consumer;

export function useAudio() {
  const context = useContext(AudioSlice);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}

export const initialState: AudioState = {
  audioFiles: [],
  totalAudioCount: 0,
  playList: [],
  addToPlayList: null,
  permissionError: false,
  dataProvider: new DataProvider((r1, r2) => r1 !== r2),
  playbackObj: new Audio.Sound(),
  soundObj: null,
  currentAudio: null,
  isPlaying: false,
  isPlayListRunning: false,
  activePlayList: null,
  currentAudioIndex: 0,
  playbackPosition: null,
  playbackDuration: null,
};

interface AudioProviderProps {
  initial?: AudioState;
}

export function AudioProvider(props: PropsWithChildren<AudioProviderProps>): ReactElement {
  const { initial } = props;
  const [state, setState] = useState<AudioState>(initial || initialState);

  const updateState = (update: Partial<AudioState>) => {
    setState(prev => ({ ...prev, ...update }));
  };

  const getAudioFiles = async () => {
    const { dataProvider, audioFiles } = state;
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });

    updateState({
      dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
      audioFiles: [...audioFiles, ...media.assets],
      totalAudioCount: media.totalCount,
    });
  };

  const loadPreviousAudio = async () => {
    const previousAudioJSON = await AsyncStorage.getItem('previousAudio');

    if (previousAudioJSON === null) {
      setState({ ...state, currentAudio: state.audioFiles[0], currentAudioIndex: 0 });
    } else {
      const previousAudio = JSON.parse(previousAudioJSON);
      setState({ ...state, currentAudio: previousAudio.audio, currentAudioIndex: previousAudio.index });
    }
  };

  const onPlaybackStatusUpdate = async (playbackStatus: any) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      updateState({
        playbackPosition: playbackStatus.positionMillis,
        playbackDuration: playbackStatus.durationMillis,
      });
    }

    if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
      storeAudioForNextOpening(state.currentAudio!, state.currentAudioIndex, playbackStatus.positionMillis);
    }

    if (playbackStatus.didJustFinish) {
      if (state.isPlayListRunning && !!state.activePlayList) {
        let audio: MediaLibrary.Asset;
        const indexOnPlayList = state.activePlayList.audios.findIndex(({ id }) => id === state.currentAudio!.id);
        const nextIndex = indexOnPlayList + 1;
        audio = state.activePlayList.audios[nextIndex];

        if (!audio) audio = state.activePlayList.audios[0];

        const indexOnAllList = state.audioFiles.findIndex(({ id }) => id === audio.id);

        const status = await playNext(state.playbackObj, audio.uri);
        return updateState({
          soundObj: status,
          isPlaying: true,
          currentAudio: audio,
          currentAudioIndex: indexOnAllList,
        });
      }

      const nextAudioIndex = state.currentAudioIndex + 1;
      // there is no next audio to play or the current audio is the last
      if (nextAudioIndex >= state.totalAudioCount) {
        state.playbackObj.unloadAsync();
        updateState({
          soundObj: null,
          currentAudio: state.audioFiles[0],
          isPlaying: false,
          currentAudioIndex: 0,
          playbackPosition: null,
          playbackDuration: null,
        });
        return await storeAudioForNextOpening(state.audioFiles[0], 0);
      }
      // otherwise we want to select the next audio
      const audio = state.audioFiles[nextAudioIndex];
      const status = await playNext(state.playbackObj, audio.uri);
      updateState({
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: nextAudioIndex,
      });
      await storeAudioForNextOpening(audio, nextAudioIndex);
    }
  };

  const permissionAllert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files!', [
      { text: 'I am ready', onPress: () => getPermission() },
      { text: 'cancel', onPress: () => permissionAllert() },
    ]);
  };

  const getPermission = async () => {
    // {
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    //   }
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      //    we want to get all the audio files
      getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      updateState({ permissionError: true });
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        //   we are going to display alert that user must allow this permission to work this app
        permissionAllert();
      }

      if (status === 'granted') {
        //    we want to get all the audio files
        getAudioFiles();
      }

      if (status === 'denied' && !canAskAgain) {
        //   we want to display some error to the user
        updateState({ permissionError: true });
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <AudioSlice.Provider
      value={{
        ...state,
        updateState,
        loadPreviousAudio,
        onPlaybackStatusUpdate,
      }}
      {...props}
    />
  );
}
