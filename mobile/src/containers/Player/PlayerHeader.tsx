import React, { ReactElement } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Track } from '../../types/model';
import { CoverImage } from '../common/CoverImage';

interface PlayerHeaderProps {
  track: Track;
  onClose: VoidFunction;
}

export function PlayerHeader(props: PlayerHeaderProps): ReactElement {
  const { track, onClose } = props;

  return (
    <View style={styles.header}>
      <Pressable onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="chevron-down" size={32} color="white" />
      </Pressable>
      <CoverImage albumId={track.albumId} size="36" style={{ marginRight: 10 }} />
      <View style={styles.trackData}>
        <Text numberOfLines={1} style={styles.title}>
          {track.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          Unknown artist
        </Text>
      </View>
      <Pressable style={styles.closeBtn}>
        {/* <MaterialCommunityIcons name="cards-heart" size={28} color="white" /> */}
        <MaterialCommunityIcons name="cards-heart-outline" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const paddingHorizontal = 10;
const coverSize = 36;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  trackData: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: 'white',
  },
  artist: {
    color: 'white',
    opacity: 0.5,
  },
  closeBtn: {
    paddingHorizontal,
  },
  faveBtn: {
    paddingHorizontal,
  },
});
