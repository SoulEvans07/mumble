import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Text, StatusBar, StyleSheet, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { AppNavigator } from './screens/App.navigator';
import { store } from './store';

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    TrackPlayer.setupPlayer().finally(() => setLoading(false));
    TrackPlayer.updateOptions({ stoppingAppPausesPlayback: true });
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Text>Player loading...</Text>}
      {!loading && (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
