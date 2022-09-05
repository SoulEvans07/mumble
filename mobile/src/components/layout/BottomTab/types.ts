import { FontAwesome } from '@expo/vector-icons';

import { RootTabParamList } from '../../../screens/types';
import { IconProps } from '../../ui/Icon/Icon';

export interface BottomTabItem {
  to: keyof RootTabParamList;
  title: string;
  icon: IconProps['name'];
}
