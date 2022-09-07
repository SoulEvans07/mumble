import { ReactElement } from 'react';
import { Text, View, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

import Play from '../components/ui/svg/play.svg';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerActions } from '../store/player';
import { selectCurrent } from '../store/player/selectors';

export function PlayerBar(): ReactElement | null {
  const current = useAppSelector(selectCurrent);

  const dispatch = useAppDispatch();
  const openPlayer = () => dispatch(playerActions.setVisibility(true));

  if (!current) return null;
  const { track } = current;

  const playOrPause = (event: GestureResponderEvent) => {
    event.stopPropagation();
  };

  return (
    <Pressable style={styles.playerBar} onPress={openPlayer}>
      <View style={styles.trackBlock}>
        <View style={styles.albumCover}></View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>Unknown artist</Text>
        </View>
        <Pressable style={styles.playPauseIcon} onPress={playOrPause}>
          <Play width={28} height={28} fill="white" />
        </Pressable>
      </View>
      <View style={styles.timeline}>
        <View style={[styles.progressBar, { width: 50 }]} />
      </View>
    </Pressable>
  );
}

const paddingHorizontal = 10;
const height = 50;
const coverSize = 40;
const timelineHeight = 2;
const styles = StyleSheet.create({
  playerBar: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: height, // + timelineHeight,
    backgroundColor: 'hsl(226, 17%, 15%)',
  },
  trackBlock: {
    height,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal,
  },
  albumCover: {
    borderRadius: 5,
    width: coverSize,
    height: coverSize,
    marginRight: 10,
    backgroundColor: 'blue',
    opacity: 0.5,
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
