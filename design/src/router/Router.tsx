import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './types';
import { MusicScreen } from '../screens/MusicScreen/MusicScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { Main } from '../containers/Main/Main';

export function Router(): ReactElement {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to={ROUTES.MUSIC} />} />
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          <Route path={ROUTES.MUSIC} element={<MusicScreen />} />
          <Route path={ROUTES.SEARCH} element={<SearchScreen />} />
        </Route>
      </Routes>
    </>
  );
}
