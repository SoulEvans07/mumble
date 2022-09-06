import { ReactElement, useMemo } from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';

import { Icon, IconProps } from '../ui/Icon/Icon';
import { dotStyle, iconBtnBgStyle, IconButtonBaseProps } from './helpers';

export interface SwitchState<T extends string> {
  value: T;
  active?: boolean;
  icon?: IconProps['name'];
}

interface IconMultiSwitchProps<T extends string> extends IconButtonBaseProps {
  value: T;
  icon: IconProps['name'];
  states: SwitchState<T>[];
  onSwitch?: (value: T) => void;
}

export function IconMultiSwitch<T extends string>(props: IconMultiSwitchProps<T>): ReactElement {
  const { value, states, style } = props;
  const size = Number(props.size || 32);
  const ratio = Number(props.ratio || 0.5);
  const iconSize = size * ratio;

  const state = useMemo(() => states.find(s => s.value === value), [states, value]);
  const icon = useMemo(() => (state && state.icon ? state.icon : props.icon), [state, props.icon]);

  const onSwitch = () => {
    if (!props.onSwitch) return;
    const next = (states.findIndex(s => s.value === value) + 1) % states.length;
    props.onSwitch(states[next].value);
  };

  return (
    <Pressable onPress={onSwitch} style={iconBtnBgStyle(props)}>
      <Icon name={icon} size={iconSize} fill="white" opacity={0.7} />
      {!!state?.active && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: dotStyle,
});
