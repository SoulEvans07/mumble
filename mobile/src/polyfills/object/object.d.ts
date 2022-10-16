declare interface ObjectConstructor {
  keysTyped<T extends UnknownObject>(obj: T): Array<keyof T>;
  entriesTyped<T extends UnknownObject>(obj: T): Array<[keyof T, T[keyof T]]>;
}

declare type Properties<T extends UnknownObject> = Pick<T, PropertyKeys<T>>;
declare type PropertyKeys<T extends UnknownObject> = {
  [K in keyof T]: T[K] extends UnknownFunction ? never : K;
}[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types
declare type UnknownObject = Object;
// eslint-disable-next-line @typescript-eslint/ban-types
declare type UnknownFunction = Function;

declare type Constructor<T> = new (...args) => T;
