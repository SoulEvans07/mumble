import { ViewStyle } from 'react-native';

import { NumberProp } from '../../types/props';
import { IconProps } from '../ui/Icon/Icon';

export interface IconButtonBaseProps {
  size?: IconProps['size'];
  ratio?: NumberProp;
  style?: ViewStyle;
  type?: 'filled' | 'transparent';
}

export function iconBtnBgStyle(props: IconButtonBaseProps): ViewStyle {
  const { type = 'transparent', style } = props;
  const size = Number(props.size || 32);

  return {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: type === 'transparent' ? type : '#ffffff40',
    width: size,
    height: size,
    borderRadius: size,
    ...style,
  };
}

const dotSize = 4;
export const dotStyle: ViewStyle = {
  position: 'absolute',
  bottom: -2,
  left: '50%',
  transform: [{ translateX: -0.5 * dotSize }],
  width: dotSize,
  height: dotSize,
  borderRadius: dotSize,
  backgroundColor: 'white',
};
