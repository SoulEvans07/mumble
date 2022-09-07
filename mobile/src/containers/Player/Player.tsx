import { ReactElement } from 'react';
import { Modal, View, StyleSheet } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { playerActions } from '../../store/player';
import { selectCurrentTrackPlaceholder, selectPlayerVisibility } from '../../store/player/selectors';
import { PlayerHeader } from './PlayerHeader';

export function Player(): ReactElement {
  const visible = useAppSelector(selectPlayerVisibility);
  const currentTrack = useAppSelector(selectCurrentTrackPlaceholder);

  const dispatch = useAppDispatch();
  const closePlayer = () => dispatch(playerActions.setVisibility(false));

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <PlayerHeader track={currentTrack} onClose={closePlayer} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'hsl(226, 17%, 15%)',
  },
});
