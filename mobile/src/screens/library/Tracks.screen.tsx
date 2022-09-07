import { ReactElement, useEffect, useState } from 'react';
import { Image, Text, View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { millisToMin } from '../../utils/timeUtils';
import { Track } from '../../types/model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTracks } from '../../store/player/selectors';
import { fetchTracks } from '../../store/library/thunk.actions';

export function TracksLibraryTab(): ReactElement {
  const { top } = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const { status, data: tracks, error } = useAppSelector(selectTracks);

  const refresh = async () => dispatch(fetchTracks());

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { marginTop: top }]}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={refresh} />}
    >
      {/* TODO: error handling */}
      {Object.values(tracks).map(item => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.asset.uri}</Text>
          <Text>{millisToMin(item.duration)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
