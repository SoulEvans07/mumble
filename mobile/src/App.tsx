import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

import { AudioProvider } from './contexts/audio/AudioContext';
import { AppNavigator } from './navigation/App.navigator';

export default function App() {
  const [sound, setSound] = useState();

  const findSong = async () => {
    const song = DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
  };

  return (
    <AudioProvider>
      <AppNavigator />
    </AudioProvider>
  );
}
