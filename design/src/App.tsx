import './root.scss';

import { Router } from './router/Router';
import { StoreProvider } from './contexts/store/StoreContext';
import { BottomNavBar } from './components/layout/BottomNavBar/BottomNavBar';
import { NavTab } from './components/layout/BottomNavBar/types';

const bottomMenu: NavTab[] = [
  { name: 'HOME', title: 'Home', icon: 'house' },
  { name: 'MUSIC', title: 'Music', icon: 'album-collection' },
  { name: 'SEARCH', title: 'Search', icon: 'magnifying-glass' },
];

export function App() {
  return (
    <StoreProvider>
      <Router />
      <BottomNavBar tabs={bottomMenu} />
    </StoreProvider>
  );
}
