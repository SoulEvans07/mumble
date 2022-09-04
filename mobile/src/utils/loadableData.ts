export type LoadableStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface Loadable<T> {
  status: LoadableStatus;
  data: T;
  error: string | undefined;
}

export function initLoadable<T>(data: T): Loadable<T> {
  return {
    status: 'idle',
    error: undefined,
    data,
  };
}
