import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { AudioContext } from '../contexts/audio/AudioContext';
import { storeAudioForNextOpening } from '../helpers/misc';

type Selector = 'next' | 'previous';

// play audio
export const play = async (playbackObj: Audio.Sound, uri: string, lastPosition?: number) => {
  try {
    if (!lastPosition)
      return await playbackObj.loadAsync({ uri }, { shouldPlay: true, progressUpdateIntervalMillis: 1000 });

    // but if there is lastPosition then we will play audio from the lastPosition
    await playbackObj.loadAsync({ uri }, { progressUpdateIntervalMillis: 1000 });

    return await playbackObj.playFromPositionAsync(lastPosition);
  } catch (error) {
    console.log('error inside play helper method', (error as Error).message);
  }
};

// pause audio
export const pause = async (playbackObj: Audio.Sound) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error) {
    console.log('error inside pause helper method', (error as Error).message);
  }
};

// resume audio
export const resume = async (playbackObj: Audio.Sound) => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log('error inside resume helper method', (error as Error).message);
  }
};

// select another audio
export const playNext = async (playbackObj: Audio.Sound, uri: string) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error) {
    console.log('error inside playNext helper method', (error as Error).message);
  }
};

export const selectAudio = async (audio: any, context: AudioContext, playListInfo = {}) => {
  const { soundObj, playbackObj, currentAudio, updateState, audioFiles, onPlaybackStatusUpdate } = context;
  try {
    // playing audio for the first time.
    if (soundObj === null) {
      const status = await play(playbackObj, audio.uri, audio);
      const index = audioFiles.findIndex(({ id }) => id === audio.id);
      updateState({
        currentAudio: audio,
        soundObj: status === undefined ? null : status,
        isPlaying: true,
        currentAudioIndex: index,
        isPlayListRunning: false,
        activePlayList: null,
        ...playListInfo,
      });
      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      return storeAudioForNextOpening(audio, index);
    }

    // pause audio
    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playbackObj);
      return updateState({
        soundObj: status === undefined ? null : status,
        isPlaying: false,
        playbackPosition: (status as any).positionMillis,
      });
    }

    // resume audio
    if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playbackObj);
      return updateState({ soundObj: status, isPlaying: true });
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.findIndex(({ id }) => id === audio.id);
      updateState({
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        isPlayListRunning: false,
        activePlayList: null,
        ...playListInfo,
      });
      return storeAudioForNextOpening(audio, index);
    }
  } catch (error) {
    console.log('error inside select audio method.', (error as Error).message);
  }
};

const selectAudioFromPlayList = async (context: AudioContext, select: Selector) => {
  const { activePlayList, currentAudio, audioFiles, playbackObj, updateState } = context;

  if (!activePlayList) return;

  let audio: MediaLibrary.Asset;
  let defaultIndex;
  let nextIndex;

  const indexOnPlayList = activePlayList.audios.findIndex(({ id }) => id === currentAudio.id);

  switch (select) {
    case 'next':
      nextIndex = indexOnPlayList + 1;
      defaultIndex = 0;
      break;
    case 'previous':
      nextIndex = indexOnPlayList - 1;
      defaultIndex = activePlayList.audios.length - 1;
      break;
  }

  audio = activePlayList.audios[nextIndex];

  if (!audio) audio = activePlayList.audios[defaultIndex];

  const indexOnAllList = audioFiles.findIndex(({ id }) => id === audio.id);

  const status = await playNext(playbackObj, audio.uri);

  updateState({
    soundObj: status,
    isPlaying: true,
    currentAudio: audio,
    currentAudioIndex: indexOnAllList,
  });
};

export const changeAudio = async (context: AudioContext, select: Selector) => {
  const {
    playbackObj,
    currentAudioIndex,
    totalAudioCount,
    audioFiles,
    updateState,
    isPlayListRunning,
    onPlaybackStatusUpdate,
  } = context;

  if (isPlayListRunning) return selectAudioFromPlayList(context, select);

  try {
    const { isLoaded } = await playbackObj.getStatusAsync();
    const isLastAudio = currentAudioIndex + 1 === totalAudioCount;
    const isFirstAudio = currentAudioIndex <= 0;
    let audio: MediaLibrary.Asset;
    let index = 0;
    let status;

    switch (select) {
      case 'next':
        audio = audioFiles[currentAudioIndex + 1];
        if (!isLoaded && !isLastAudio) {
          index = currentAudioIndex + 1;
          status = await play(playbackObj, audio.uri);
          playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }

        if (isLoaded && !isLastAudio) {
          index = currentAudioIndex + 1;
          status = await playNext(playbackObj, audio.uri);
        }

        if (isLastAudio) {
          index = 0;
          audio = audioFiles[index];
          if (isLoaded) {
            status = await playNext(playbackObj, audio.uri);
          } else {
            status = await play(playbackObj, audio.uri);
          }
        }
        break;
      case 'previous':
        audio = audioFiles[currentAudioIndex - 1];
        if (!isLoaded && !isFirstAudio) {
          index = currentAudioIndex - 1;
          status = await play(playbackObj, audio.uri);
          playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }

        if (isLoaded && !isFirstAudio) {
          index = currentAudioIndex - 1;
          status = await playNext(playbackObj, audio.uri);
        }

        if (isFirstAudio) {
          index = totalAudioCount - 1;
          audio = audioFiles[index];
          if (isLoaded) {
            status = await playNext(playbackObj, audio.uri);
          } else {
            status = await play(playbackObj, audio.uri);
          }
        }
        break;
    }

    updateState({
      currentAudio: audio,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });

    storeAudioForNextOpening(audio, index);
  } catch (error) {
    console.log('error inside cahnge audio method.', (error as Error).message);
  }
};

export const moveAudio = async (context: AudioContext, value: number) => {
  const { soundObj, isPlaying, playbackObj, updateState } = context;
  if (soundObj === null || !isPlaying) return;

  try {
    console.log('moveAudio soundObj', soundObj);

    const status = await playbackObj.setPositionAsync(Math.floor((soundObj as any).durationMillis * value));

    console.log('moveAudio status', status);

    updateState({
      soundObj: status,
      playbackPosition: (status as any).positionMillis,
    });

    await resume(playbackObj);
  } catch (error) {
    console.log('error inside onSlidingComplete callback', error);
  }
};
