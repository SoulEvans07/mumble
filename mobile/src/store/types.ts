export interface Loadable<T> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  data: T;
  error: string | undefined;
}
