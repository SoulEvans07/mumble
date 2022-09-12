import { ReactElement, useEffect } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTracks } from '../../store/library/selectors';
import { libraryActions } from '../../store/library';
import { playerActions } from '../../store/player/actions';
import { TrackItem } from '../../containers/common/TrackItem';
import { selectCurrent } from '../../store/player/selectors';

export function TracksLibraryTab(): ReactElement {
  const dispatch = useAppDispatch();
  const { status, data: tracks, error } = useAppSelector(selectTracks);
  const current = useAppSelector(selectCurrent);

  const refresh = async () => dispatch(libraryActions.fetchTracks());

  useEffect(() => {
    if (status === 'idle') refresh();
  }, [status]);

  const playTrack = (index: number) => () => {
    dispatch(playerActions.startQueue({ queue: Object.values(tracks), index }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: current ? 50 : 10 }]}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={refresh} />}
    >
      {/* TODO: error handling */}
      {Object.values(tracks).map((item, index) => (
        <TrackItem key={item.id} item={item} onPress={playTrack(index)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
