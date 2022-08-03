import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useAudio } from '../../contexts/audio/AudioContext';
import { changeAudio, selectAudio } from '../../controllers/audioController';

interface SongQueueProps {}

export const SongQueue = (props: SongQueueProps) => {
  const context = useAudio();

  useEffect(() => {
    context.loadPreviousAudio();
    console.log(context);
  }, []);

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio, context);
    console.log(context);
  };

  const handleNext = async () => {
    await changeAudio(context, 'next');
  }

  const handlePrev = async () => {
    await changeAudio(context, 'previous');
  }

  return (
    <View>
      <Text>{context.currentAudio?.filename}</Text>
      <Button title="Prev" onPress={handlePrev} />
      <Button title={context.isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({});
