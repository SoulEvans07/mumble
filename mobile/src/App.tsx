import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

import { AudioProvider } from './contexts/audio/AudioContext';
import { SongQueue } from './components/SongQueue/SongQueue';

export default function App() {
  const [sound, setSound] = useState();

  const findSong = async () => {
    const song = DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
  };

  return (
    <AudioProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <SongQueue />
      </View>
    </AudioProvider>
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
