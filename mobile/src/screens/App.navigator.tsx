import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import House from '../components/ui/svg/house.svg';
import AlbumCollection from '../components/ui/svg/album-collection.svg';
import MagnifyingGlass from '../components/ui/svg/magnifying-glass.svg';

import { RootTabParamList } from './types';
import { HomeScreen } from './Home.screen';
import { LibraryNavigator } from './library/Library.navigator';
import { SearchScreen } from './Search.screen';
import { PlayerBar } from '../containers/PlayerBar';
import { BottomTabItem } from '../components/layout/BottomTab/types';
import { BottomTab } from '../components/layout/BottomTab/BottomTab';
import { Player } from '../containers/Player/Player';

const AppTabNavigator = createBottomTabNavigator<RootTabParamList>();

const tabs: BottomTabItem[] = [
  { to: 'Home', title: 'Home', icon: House },
  { to: 'Library', title: 'Library', icon: AlbumCollection },
  { to: 'Search', title: 'Search', icon: MagnifyingGlass },
];

export function AppNavigator(): ReactElement {
  return (
    <NavigationContainer>
      <AppTabNavigator.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, unmountOnBlur: true }}
        tabBar={props => <BottomTab tabs={tabs} {...props} />}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <AppTabNavigator.Screen name="Home" component={HomeScreen} />
        <AppTabNavigator.Screen name="Library" component={LibraryNavigator} />
        <AppTabNavigator.Screen name="Search" component={SearchScreen} />
      </AppTabNavigator.Navigator>
      <PlayerBar />
      <Player />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
