import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Library: undefined;
  Search: undefined;
};

export type LibraryTabParamList = {
  Tracks: undefined;
  Playlists: undefined;
};

export const useBottomTabNavigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>;
