import { FontAwesome } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';

import { RootTabParamList } from '../../../navigation/types';

export interface BottomTabItem {
  to: keyof RootTabParamList;
  title: string;
  icon: React.FC<SvgProps>;
}
