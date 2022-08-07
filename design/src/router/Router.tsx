import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './types';
import { MusicScreen } from '../screens/MusicScreen/MusicScreen';
import { PlayerScreen } from '../screens/PlayerScreen/PlayerScreen';

export function Router(): ReactElement {
  const rootPage = ROUTES.MUSIC;

  return (
    <Routes>
      <Route index element={<Navigate to={rootPage} />} />
      <Route path={ROUTES.MUSIC} element={<MusicScreen />} />
      <Route path={ROUTES.PLAYER} element={<PlayerScreen />} />
    </Routes>
  );
}
