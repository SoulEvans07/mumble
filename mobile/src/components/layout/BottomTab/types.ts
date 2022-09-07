import { FontAwesome } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';

import { RootTabParamList } from '../../../screens/types';

export interface BottomTabItem {
  to: keyof RootTabParamList;
  title: string;
  icon: React.FC<SvgProps>;
}
