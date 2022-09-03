import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources, Translations } from './types';

function setup() {
  validateTranslationKeys(resources);
  initI18n(resources);
}

function validateTranslationKeys(resources: Translations) {
  const keys = Object.keys(
    Object.entries(resources).reduce((acc, [, dict]) => {
      return {
        ...acc,
        ...dict.translation,
      };
    }, {} as Record<string, string>)
  );

  const missingKeys = Object.entries(resources).reduce(
    (acc, [lang, dict]) => ({
      ...acc,
      [lang]: keys.filter(k => !dict.translation[k]),
    }),
    {} as Record<string, string[]>
  );

  Object.entries(missingKeys).forEach(([lang, missing]) => {
    if (missing.length) {
      console.error(`${lang.toUpperCase()} translation is missing:`, missing);
    }
  });
}

function initI18n(resources: Translations) {
  i18next.use(initReactI18next).init({
    lng: 'hu',
    resources,
  });
}

setup();
