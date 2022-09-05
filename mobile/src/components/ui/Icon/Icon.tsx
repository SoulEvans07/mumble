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
  const { name, size = 24, style, ...restProps } = props;
  const IconComp = SVGs[name];

  return <IconComp width={Number(size)} height={Number(size)} style={[styles.icon, style]} {...restProps} />;
}

const styles = StyleSheet.create({
  icon: {},
});
