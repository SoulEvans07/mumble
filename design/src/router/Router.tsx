import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './types';
import { LibraryScreen } from '../screens/LibraryScreen/LibraryScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { Main } from '../containers/Main/Main';

export function Router(): ReactElement {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to={ROUTES.LIBRARY} />} />
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          <Route path={ROUTES.LIBRARY} element={<LibraryScreen />} />
          <Route path={ROUTES.SEARCH} element={<SearchScreen />} />
        </Route>
      </Routes>
    </>
  );
}
