import React, { ReactElement } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUnsafe, selectPlayerDomain } from '../../store/player/selectors';
import { IconSwitch } from '../../components/control/IconSwitch';
import { IconMultiSwitch, SwitchState } from '../../components/control/IconMultiSwitch';
import { IconButton } from '../../components/control/IconButton';
import { CapsuleButton } from '../../components/control/CapsuleButton';
import { playerActions } from '../../store/player';
import { RepeatMode } from '../../store/player/types';
import { secondToMin } from '../../utils/timeUtils';
import { SeekSlider } from './SeekSlider';

const repeatSwitchStates: SwitchState<RepeatMode>[] = [
  { value: 'no-repeat' },
  { value: 'repeat', active: true },
  { value: 'single', active: true, icon: 'repeat-1' },
];

export function PlayerControls(): ReactElement {
  const dispatch = useAppDispatch();
  const { shuffle, repeat } = useAppSelector(selectPlayerDomain);
  const { track, isPlaying, playbackPosition } = useAppSelector(selectCurrentUnsafe);

  const switchShuffle = () => dispatch(playerActions.switchShuffle());
  const playOrPause = () => dispatch(playerActions.playOrPause());
  const switchRepeat = (mode: RepeatMode) => dispatch(playerActions.setRepeatMode(mode));

  const onSeek = (value: number) => dispatch(playerActions.setSeekPosition(value));

  return (
    <View style={styles.container}>
      <View style={styles.dragArea}>
        <View style={styles.dragHandle} />
      </View>
      <View style={styles.timeline}>
        <SeekSlider
          style={styles.progressSlider}
          maximumValue={track.duration}
          value={playbackPosition}
          onValueChange={onSeek}
        />
        <View style={styles.timestampRow}>
          <Text style={styles.timestamps}>{secondToMin(playbackPosition)}</Text>
          <Text style={styles.timestamps}>{secondToMin(track.duration)}</Text>
        </View>
      </View>
      <View style={styles.controlRow}>
        <IconSwitch icon="shuffle" {...sizes.side} active={shuffle} onSwitch={switchShuffle} />
        <IconButton icon="backward-step" {...sizes.middle} style={styles.prevBtn} />
        <IconSwitch
          activeIcon="pause"
          inactiveIcon="play"
          {...sizes.play}
          active={isPlaying}
          onSwitch={playOrPause}
          style={styles.playBtn}
        />
        <IconButton icon="forward-step" {...sizes.middle} style={styles.nextBtn} />
        <IconMultiSwitch
          icon="repeat"
          {...sizes.side}
          value={repeat}
          states={repeatSwitchStates}
          onSwitch={switchRepeat}
        />
      </View>
      <View style={styles.menuRow}>
        <IconButton icon="ellipsis" type="filled" size={sizes.menu} />
        <CapsuleButton title="Lyrics" height={sizes.menu} />
        <IconButton icon="queue-list" type="filled" size={sizes.menu} />
      </View>
    </View>
  );
}

const sizes = {
  side: { size: 36, ratio: 0.6 },
  middle: { size: 44, ratio: 0.6 },
  play: { size: 60, ratio: 0.7 },
  menu: 36,
};

const handleHeight = 6;
const styles = StyleSheet.create({
  container: {},
  dragArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: handleHeight * 4,
  },
  dragHandle: {
    width: '15%',
    height: handleHeight,
    borderRadius: handleHeight / 2,
    backgroundColor: 'white',
    opacity: 0.3,
  },
  timeline: {
    paddingHorizontal: 20,
  },
  timestampRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  timestamps: {
    color: 'white',
    opacity: 0.2,
    fontSize: 11,
  },
  progressSlider: {
    marginTop: 10,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  prevBtn: {
    marginLeft: 'auto',
  },
  playBtn: {
    marginHorizontal: 5,
  },
  nextBtn: {
    marginRight: 'auto',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
