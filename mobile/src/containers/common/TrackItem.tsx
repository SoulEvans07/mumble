import React, { ReactElement } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { CoverImage } from './CoverImage';
import { Track } from '../../types/model';

interface TrackItemProps {
  item: Track;
  onPress?: VoidFunction;
}

export function TrackItem(props: TrackItemProps): ReactElement {
  const { item, onPress } = props;

  return (
    <Pressable key={item.id} onPress={onPress} style={styles.container}>
      <CoverImage albumId={item.albumId} size="56" style={styles.coverImage} />
      <View style={styles.textBlock}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          Unknown artist
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  coverImage: {
    marginRight: 10,
  },
  textBlock: {
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  artist: {
    color: '#ffffff80',
  },
});
