import { Loadable } from './types';

export function initLoadable<T>(data: T): Loadable<T> {
  return {
    status: 'idle',
    error: undefined,
    data,
  };
}
