import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EnglishTranslation from './locales/en.json'; // Import your English translations
import HindiTranslation from './locales/hindi.json';
import TeluguTranslation from './locales/telugu.json';
// Import other language translations if needed

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      english: {
        translation: EnglishTranslation, // English translations
      },
      hindi: {
        translation: HindiTranslation
      },
      telugu: {
        translation: TeluguTranslation
      }
      // Add more languages here if needed
    },
    lng: 'english', // Set the default language
    fallbackLng: 'english', // Set the fallback language
    interpolation: {
      escapeValue: false, // React already escapes variables, so no need for additional escaping
    },
  });

export default i18n;
