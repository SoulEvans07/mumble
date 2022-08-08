import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './types';
import { NavTab } from '../components/layout/BottomNavBar/types';
import { BottomNavBar } from '../components/layout/BottomNavBar/BottomNavBar';
import { MusicScreen } from '../screens/MusicScreen/MusicScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';

const bottomMenu: NavTab[] = [
  { path: ROUTES.HOME, title: 'Home', icon: 'house' },
  { path: ROUTES.MUSIC, title: 'Music', icon: 'album-collection' },
  { path: ROUTES.SEARCH, title: 'Search', icon: 'magnifying-glass' },
];

export function Router(): ReactElement {
  return (
    <>
      <Routes>
        <Route path="/" element={<BottomNavBar tabs={bottomMenu} />}>
          <Route index element={<Navigate to={ROUTES.MUSIC} />} />
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          <Route path={ROUTES.MUSIC} element={<MusicScreen />} />
          <Route path={ROUTES.SEARCH} element={<SearchScreen />} />
        </Route>
      </Routes>
    </>
  );
}
