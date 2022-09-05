import { ReactElement } from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';

import { Icon, IconProps } from '../ui/Icon/Icon';
import { dotStyle, iconBtnBgStyle, IconButtonBaseProps } from './helpers';

interface IconSwitchBaseProps extends IconButtonBaseProps {
  active?: boolean;
  onSwitch?: VoidFunction;
}

interface DotIconSwitchProps extends IconSwitchBaseProps {
  icon: IconProps['name'];
}

interface TwoIconSwitchProps extends IconSwitchBaseProps {
  activeIcon: IconProps['name'];
  inactiveIcon: IconProps['name'];
}

type IconSwitchProps = DotIconSwitchProps | TwoIconSwitchProps;

export function IconSwitch(props: IconSwitchProps): ReactElement {
  const { active, onSwitch, style } = props;
  const size = Number(props.size || 32);
  const ratio = Number(props.ratio || 0.5);
  const iconSize = size * ratio;

  const dotSwitch = 'icon' in props;
  const icon = dotSwitch ? props.icon : active ? props.activeIcon : props.inactiveIcon;
  const opacity = dotSwitch ? 0.7 : 1;

  return (
    <Pressable onPress={onSwitch} style={iconBtnBgStyle(props)}>
      <Icon name={icon} size={iconSize} fill="white" style={{ opacity }} />
      {dotSwitch && active && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: dotStyle,
});
