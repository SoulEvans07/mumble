export type IntersectKeys<T, P> = {
  [K in keyof T]: K extends keyof P ? (T[K] extends P[K] ? K : never) : never;
}[keyof T];
export type Intersect<T, P> = Pick<T, IntersectKeys<T, P>>;
