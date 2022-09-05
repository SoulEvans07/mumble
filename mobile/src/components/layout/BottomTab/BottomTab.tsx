import React, { ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { BottomTabItem } from './types';
import { useBottomTabNavigation } from '../../../screens/types';
import { Icon } from '../../ui/Icon/Icon';

interface BottomTabProps extends BottomTabBarProps {
  tabs: BottomTabItem[];
}

export function BottomTab(props: BottomTabProps): ReactElement {
  const { navigate } = useBottomTabNavigation();
  const { tabs, state } = props;

  const onMenuSelect = (to: BottomTabItem['to']) => () => navigate(to);

  return (
    <View style={styles.navbar}>
      {tabs.map((tab, index) => {
        const active = state.index === index;
        const color = active ? '#ffffff' : '#ffffff60';
        return (
          <Pressable onPress={onMenuSelect(tab.to)} key={tab.title} style={styles.tabItem}>
            <Icon name={tab.icon} size="20" fill={color} />
            <Text style={[styles.tabTitle, { color }]}>{tab.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: 'hsl(226, 17%, 15%)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitle: {
    marginTop: 5,
    fontSize: 10,
  },
});
