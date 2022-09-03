import { t, StringMap, TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from './types';

export function T<TInterpolationMap extends object = StringMap>(
  key: TranslationKeys,
  options?: TOptions<TInterpolationMap>,
  defaultValue?: string
): string {
  return defaultValue === undefined ? t(key, options) : t(key, defaultValue, options);
}

export function useAppTranslation() {
  const { i18n, ready } = useTranslation();
  return { t: T, i18n, ready };
}
