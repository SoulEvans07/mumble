import { ReactElement } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LibraryTabParamList } from '../types';
import { TracksLibraryTab } from './Tracks.screen';

const LibraryTabView = createMaterialTopTabNavigator<LibraryTabParamList>();

export function LibraryNavigator(): ReactElement {
  const { top: paddingTop } = useSafeAreaInsets();

  const initialRouteName: keyof LibraryTabParamList = 'Tracks';

  return (
    <SafeAreaView style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
      </View>
      <LibraryTabView.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: { backgroundColor: '#1e1e1e' },
          tabBarItemStyle: { width: 100, padding: 0 },
          tabBarActiveTintColor: 'white',
          tabBarIndicatorStyle: { backgroundColor: '#fd5451' },
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <LibraryTabView.Screen
          options={{ title: 'Tracks', tabBarLabelStyle: styles.tabTitle }}
          name="Tracks"
          component={TracksLibraryTab}
        />
        <LibraryTabView.Screen
          options={{ title: 'Playlists', tabBarLabelStyle: styles.tabTitle }}
          name="Playlists"
          component={TracksLibraryTab}
        />
      </LibraryTabView.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fd5451',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  tabTitle: {
    textTransform: 'none',
    fontSize: 18,
  },
});
