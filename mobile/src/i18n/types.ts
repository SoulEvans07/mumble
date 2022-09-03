import { DefaultNamespace } from 'react-i18next';
import { DeepPick, DeepPickPath } from 'ts-deep-pick';

import enTranslation from './translations/en.json';
import huTranslation from './translations/hu.json';

export const resources: Translations = {
  en: { translation: enTranslation },
  hu: { translation: huTranslation },
};

export type Translations = {
  [language: string]: { [translation in DefaultNamespace]: LanguageResource };
};

export type LanguageResource = {
  [key: string]: string;
};

export type TranslationKeys = keyof typeof enTranslation | keyof typeof huTranslation;

import testTranslation from './translations/test.json';

export type BASE = typeof testTranslation;

export interface NoGrammar {
  prop: '.';
  array: never;
  omit: never;
  mutate: never;
  glob: never;
}

export type Flatten<T> = DeepPickPath<T, NoGrammar>;

export type Paths = Flatten<BASE>;

function isString(o: unknown): o is string {
  return typeof o === 'string';
}

type StringRecord = {
  [key: string]: string | StringRecord;
};

type FlatMap<T> = {
  [key in Flatten<T>]: DeepPick<T, key>;
};

export function flatten<T extends StringRecord>(obj: T, prefix?: string): FlatMap<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const flatKey = prefix ? `${prefix}.${key}` : key;

    if (isString(value)) {
      return { ...acc, [flatKey]: value };
    } else {
      return { ...acc, ...flatten(value, flatKey) };
    }
  }, {} as FlatMap<T>);
}

const data = { pref: 'adf', asdf: 'test', test: { one: 'egy', two: 'kettő' }, empty: { still: {} } } as const;

const fl = flatten(data);

fl['empty.still'];

console.log('fl', fl);

const translation = flatten(testTranslation);

console.log('transl', translation);
