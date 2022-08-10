import { ReactElement } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function PlayerBar(): ReactElement {
  const openPlayer = () => {};

  return (
    <View style={styles.playerBar}>
      <View style={styles.trackBlock}>
        <View style={styles.coverImage}></View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Take Me Home</Text>
          <Text style={styles.artist}>Ken Ashcorp</Text>
        </View>
        <View style={styles.playPauseIcon}></View>
      </View>
      <View style={styles.timeline}>
        <View style={styles.progressBar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerBar: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 48,
  },
  trackBlock: {},
  coverImage: {},
  textBlock: {},
  title: {},
  artist: {},
  playPauseIcon: {},
  timeline: {},
  progressBar: {},
});
