import { ROUTES } from '../../../router/types';

export interface NavTab {
  path: typeof ROUTES[keyof typeof ROUTES];
  title: string;
  icon: string;
}
