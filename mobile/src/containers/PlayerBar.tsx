import React, { ReactElement, useMemo } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { IconSwitch } from '../components/control/IconSwitch';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerActions } from '../store/player';
import { selectCurrentUnsafe } from '../store/player/selectors';
import { CoverImage } from './common/CoverImage';

export function PlayerBar(): ReactElement | null {
  const { track, playbackPosition, isPlaying } = useAppSelector(selectCurrentUnsafe);

  const dispatch = useAppDispatch();
  const openPlayer = () => dispatch(playerActions.setVisibility(true));
  const playOrPause = () => dispatch(playerActions.playOrPause());

  const progressWidth = useMemo(() => {
    return `${(playbackPosition / track.duration) * 100}%`;
  }, [track.duration, playbackPosition]);

  return (
    <Pressable style={styles.playerBar} onPress={openPlayer}>
      <View style={styles.trackBlock}>
        <CoverImage albumId={track.albumId} size="40" style={{ marginRight: 10 }} />
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            Unknown artist
          </Text>
        </View>
        <Pressable style={styles.playPauseIcon} onPress={playOrPause}>
          <IconSwitch
            activeIcon="pause"
            inactiveIcon="play"
            size="36"
            ratio="0.7"
            active={isPlaying}
            onSwitch={playOrPause}
          />
        </Pressable>
      </View>
      <View style={styles.timeline}>
        <View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </Pressable>
  );
}

const paddingHorizontal = 10;
const height = 50;
const timelineHeight = 2;
const styles = StyleSheet.create({
  playerBar: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: height,
    height: height + timelineHeight,
    backgroundColor: 'hsl(226, 17%, 15%)',
  },
  trackBlock: {
    height,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal,
  },
  textBlock: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    color: 'white',
  },
  artist: {
    color: 'white',
    opacity: 0.5,
  },
  playPauseIcon: {},
  timeline: {
    flexDirection: 'row',
    width: '100%',
    height: timelineHeight,
    backgroundColor: '#ffffff0f',
  },
  progressBar: {
    height: timelineHeight,
    backgroundColor: 'white',
  },
});
