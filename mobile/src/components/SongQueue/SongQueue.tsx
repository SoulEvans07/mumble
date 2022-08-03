import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Button, Text, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

import { useAudio } from '../../contexts/audio/AudioContext';
import { changeAudio, moveAudio, pause, selectAudio } from '../../controllers/audioController';
import { convertTime } from '../../helpers/misc';

interface SongQueueProps {}

export const SongQueue = (props: SongQueueProps) => {
  const { width } = Dimensions.get('window');
  const context = useAudio();
  const { playbackPosition, playbackDuration, currentAudio } = context;

  useEffect(() => {
    context.loadPreviousAudio();
    console.log(context);

    return () => {
      pause(context.playbackObj);
    };
  }, []);

  const [currentPosition, setCurrentPosition] = useState('0:00');

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio, context);
    console.log(context);
  };

  const handleNext = async () => {
    await changeAudio(context, 'next');
  };

  const handlePrev = async () => {
    await changeAudio(context, 'previous');
  };

  const seek = useMemo(() => {
    if (!currentAudio) return 0;

    if (playbackPosition !== null && playbackDuration !== null) {
      const value = playbackPosition / playbackDuration;
      // setCurrentPosition(convertTime(value * context.currentAudio!.duration));
      return value;
    }

    if ((currentAudio as any).lastPosition) {
      const value = (currentAudio as any).lastPosition / (currentAudio.duration * 1000);
      return value;
    }

    return 0;
  }, [playbackPosition, playbackDuration]);

  useEffect(() => {
    if (playbackPosition != null) {
      console.log('seek', playbackPosition, convertTime(playbackPosition));
      setCurrentPosition(convertTime(seek));
    }
  }, [playbackPosition]);

  return (
    <View>
      {!context.currentAudio && <Text>No Song selected</Text>}

      {!!context.currentAudio && (
        <>
          <View style={styles.title}>
            <Text>{context.currentAudio.filename}</Text>
          </View>
          <View style={styles.times}>
            <Text>{convertTime(context.currentAudio.duration)}</Text>
            <Text>{currentPosition}</Text>
          </View>
          <Slider
            style={{ width, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={seek}
            minimumTrackTintColor="#636363"
            maximumTrackTintColor="#5252ad"
            onSlidingStart={async () => {
              if (!context.isPlaying) return;

              try {
                await pause(context.playbackObj);
              } catch (error) {
                console.log('error inside onSlidingStart callback', error);
              }
            }}
            onSlidingComplete={async value => {
              await moveAudio(context, value);
              setCurrentPosition('0');
            }}
          />
        </>
      )}

      <View style={{ ...styles.controls, width }}>
        <Button title="Prev" onPress={handlePrev} />
        <Button title={context.isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  times: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controls: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
