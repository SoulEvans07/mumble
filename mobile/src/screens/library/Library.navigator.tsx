import { ReactElement } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LibraryTabParamList } from '../types';
import { TracksLibraryTab } from './Tracks.screen';

const LibraryTabView = createMaterialTopTabNavigator<LibraryTabParamList>();

export function LibraryNavigator(): ReactElement {
  const { top } = useSafeAreaInsets();

  const initialRouteName: keyof LibraryTabParamList = 'Tracks';

  return (
    <SafeAreaView style={{ backgroundColor: '#1e1e1e', paddingTop: top, flex: 1 }}>
      <Text style={{ color: 'white' }}>Library</Text>
      <LibraryTabView.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: { backgroundColor: '#1e1e1e' },
          tabBarItemStyle: { width: 100 },
          tabBarActiveTintColor: 'white',
          tabBarIndicatorStyle: { backgroundColor: 'red' },
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <LibraryTabView.Screen options={{ title: 'Tracks' }} name="Tracks" component={TracksLibraryTab} />
        <LibraryTabView.Screen options={{ title: 'Playlists' }} name="Playlists" component={TracksLibraryTab} />
      </LibraryTabView.Navigator>
    </SafeAreaView>
  );
}