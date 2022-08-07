import { ROUTES } from '../../../router/types';

export interface NavTab {
  name: keyof typeof ROUTES;
  title: string;
  icon: string;
}
