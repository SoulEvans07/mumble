import { ReactElement } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, ViewStyle } from 'react-native';

import { Icon, IconProps } from '../ui/Icon/Icon';
import { iconBtnBgStyle, IconButtonBaseProps } from './helpers';

interface IconButtonProps extends IconButtonBaseProps {
  icon: IconProps['name'];
  onPress?: (event: GestureResponderEvent) => void;
}

export function IconButton(props: IconButtonProps): ReactElement {
  const { icon, onPress, style } = props;
  const size = Number(props.size || 32);
  const ratio = Number(props.ratio || 0.5);
  const iconSize = size * ratio;

  return (
    <Pressable onPress={onPress} style={iconBtnBgStyle(props)}>
      <Icon name={icon} size={iconSize} fill="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
