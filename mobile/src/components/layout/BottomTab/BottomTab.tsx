import { ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { BottomTabItem } from './types';
import { useBottomTabNavigation } from '../../../navigation/types';

interface BottomTabProps {
  tabs: BottomTabItem[];
}

export function BottomTab(props: BottomTabProps): ReactElement {
  const { navigate } = useBottomTabNavigation();
  const { tabs } = props;

  const onMenuSelect = (to: BottomTabItem['to']) => () => navigate(to);

  return (
    <View style={styles.navbar}>
      {tabs.map(tab => (
        <Pressable onPress={onMenuSelect(tab.to)} key={tab.title}>
          <tab.icon width={30} height={30} fill="white" />
          <Text>{tab.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: 'hsl(226, 17%, 15%)',
  },
});
