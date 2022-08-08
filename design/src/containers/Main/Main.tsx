import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import './Main.scss';

import { NavTab } from '../../components/layout/BottomNavBar/types';
import { BottomNavBar } from '../../components/layout/BottomNavBar/BottomNavBar';
import { PlayerBar } from '../PlayerBar/PlayerBar';
import { ROUTES } from '../../router/types';
import { Player } from '../Player/Player';

const bottomMenu: NavTab[] = [
  { path: ROUTES.HOME, title: 'Home', icon: 'house' },
  { path: ROUTES.MUSIC, title: 'Music', icon: 'album-collection' },
  { path: ROUTES.SEARCH, title: 'Search', icon: 'magnifying-glass' },
];

export function Main(): ReactElement {

  return (
    <main className="main">
      <Outlet />
      <Player />
      <PlayerBar />
      <BottomNavBar tabs={bottomMenu} />
    </main>
  );
}
