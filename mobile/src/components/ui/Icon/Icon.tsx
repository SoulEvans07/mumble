import { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { NumberProp } from '../../../types/props';
import { SVGs } from '../svg';

export interface IconProps extends Omit<SvgProps, 'width' | 'height' | 'color'> {
  name: keyof typeof SVGs;
  size?: NumberProp;
}

export function Icon(props: IconProps): ReactElement {
  const { name, size = 24, ...restProps } = props;
  const IconComp = SVGs[name];

  return <IconComp width={Number(size)} height={Number(size)} {...restProps} />;
}
