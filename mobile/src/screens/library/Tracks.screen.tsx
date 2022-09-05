import { ReactElement, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, RefreshControl, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { millisToMin } from '../../utils/timeUtils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTracks } from '../../store/library/selectors';
import { fetchTracks } from '../../store/library/thunk.actions';
import { playerActions } from '../../store/player';

export function TracksLibraryTab(): ReactElement {
  const { top } = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const { status, data: tracks, error } = useAppSelector(selectTracks);

  const refresh = async () => dispatch(fetchTracks());

  useEffect(() => {
    if (status === 'idle') refresh();
  }, [status]);

  const playTrack = (index: number) => () => {
    dispatch(playerActions.setQueue({ queue: Object.values(tracks), index }));
  };

  return (
    <ScrollView
      style={[styles.container, { marginTop: top }]}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={refresh} />}
    >
      {/* TODO: error handling */}
      {Object.values(tracks).map((item, index) => (
        <Pressable key={item.id} onPress={playTrack(index)}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            Unknown artist
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
  },
  artist: {
    color: '#ffffff80',
  },
});
