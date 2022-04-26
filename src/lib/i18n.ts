import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCcommon from '../locales/en/common.json';
import jaCcommon from '../locales/ja/common.json';

// TODO: parse https://github.com/i18next/i18next-parser

export const defaultNS = 'common';
export const resources = {
  en: { common: enCcommon },
  ja: { common: jaCcommon },
} as const;

export function initializeI18n() {
  return (
    i18n
      // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
      // learn more: https://github.com/i18next/i18next-http-backend
      // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
      // .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        load: 'languageOnly',
        ns: ['common'],
        defaultNS,
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
      })
  );
}
