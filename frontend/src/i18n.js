import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage } from 'Shared/Utils';

// Langs
import translationEN from 'Translations/en.json';
import translationTR from 'Translations/tr.json';

const lang = defaultLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    tr: {
      translation: translationTR,
    },
  },
  lng: lang,
  fallbackLng: lang,
});

export default i18n;
