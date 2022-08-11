import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { AppNavigator } from './navigation/App.navigator';
import { store } from './store';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
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
