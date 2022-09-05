import { ReactElement } from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';

import { NumberProp } from '../../types/props';

interface CapsuleButtonProps {
  title: string;
  height?: NumberProp;
  style?: ViewStyle;
}

export function CapsuleButton(props: CapsuleButtonProps): ReactElement {
  const { title, style } = props;
  const height = Number(props.height || 32);
  const fontSize = height * 0.45;
  const borderRadius = Number(height) / 2;
  const paddingHorizontal = Number(height) / 2;

  return (
    <View style={[styles.background, { height, borderRadius }, style]}>
      <Text style={[styles.text, { paddingHorizontal, fontSize }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
