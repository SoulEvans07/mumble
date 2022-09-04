import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';

import { AudioProvider } from './contexts/audio/AudioContext';
import { AppNavigator } from './screens/App.navigator';
import { store } from './store';

export default function App() {
  const [sound, setSound] = useState();

  const findSong = async () => {
    const song = DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AudioProvider>
          <AppNavigator />
        </AudioProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
