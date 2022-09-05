import { ReactElement, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, RefreshControl, Pressable } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTracks } from '../../store/library/selectors';
import { fetchTracks } from '../../store/library/thunk.actions';
import { playerActions } from '../../store/player';
import { CoverImage } from '../../containers/common/CoverImage';

export function TracksLibraryTab(): ReactElement {
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
      style={styles.container}
      contentContainerStyle={{ padding: 10 }}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={refresh} />}
    >
      {/* TODO: error handling */}
      {Object.values(tracks).map((item, index) => (
        <Pressable
          key={item.id}
          onPress={playTrack(index)}
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <CoverImage albumId={item.albumId} size="48" style={{ marginRight: 10 }} />
          <View style={{ flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              Unknown artist
            </Text>
          </View>
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
