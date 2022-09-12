import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootTabParamList } from './types';
import { HomeScreen } from './Home.screen';
import { LibraryNavigator } from './library/Library.navigator';
import { SearchScreen } from './Search.screen';
import { PlayerBar } from '../containers/PlayerBar';
import { BottomTabItem } from '../components/layout/BottomTab/types';
import { BottomTab } from '../components/layout/BottomTab/BottomTab';
import { Player } from '../containers/Player/Player';
import { useAppSelector } from '../store/hooks';
import { selectCurrent } from '../store/player/selectors';

const AppTabNavigator = createBottomTabNavigator<RootTabParamList>();

const tabs: BottomTabItem[] = [
  { to: 'Home', title: 'Home', icon: 'house' },
  { to: 'Library', title: 'Library', icon: 'album-collection' },
  { to: 'Search', title: 'Search', icon: 'magnifying-glass' },
];

export function AppNavigator(): ReactElement {
  const current = useAppSelector(selectCurrent);

  return (
    <NavigationContainer>
      <AppTabNavigator.Navigator
        initialRouteName="Library"
        screenOptions={{ headerShown: false, unmountOnBlur: true }}
        tabBar={props => <BottomTab tabs={tabs} {...props} />}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <AppTabNavigator.Screen name="Home" component={HomeScreen} />
        <AppTabNavigator.Screen name="Library" component={LibraryNavigator} />
        <AppTabNavigator.Screen name="Search" component={SearchScreen} />
      </AppTabNavigator.Navigator>
      {!!current && <PlayerBar />}
      {!!current && <Player />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
