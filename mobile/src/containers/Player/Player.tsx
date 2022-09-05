import { ReactElement } from 'react';
import { Modal, View, StyleSheet } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { playerActions } from '../../store/player';
import { selectCurrentUnsafe, selectPlayerVisibility } from '../../store/player/selectors';
import { LyricViewer } from './LyricViewer';
import { PlayerControls } from './PlayerControls';
import { PlayerHeader } from './PlayerHeader';

export function Player(): ReactElement {
  const visible = useAppSelector(selectPlayerVisibility);
  const { track } = useAppSelector(selectCurrentUnsafe);

  const dispatch = useAppDispatch();
  const closePlayer = () => dispatch(playerActions.setVisibility(false));

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <PlayerHeader track={track} onClose={closePlayer} />
        <LyricViewer />
        <PlayerControls />
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
