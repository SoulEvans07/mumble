import './root.scss';

import { Router } from './router/Router';
import { StoreProvider } from './contexts/store/StoreContext';

export function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
