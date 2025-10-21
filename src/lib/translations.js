import esTranslations from '@/locales/es.json';
import enTranslations from '@/locales/en.json';

export const getTranslations = (language) => {
  return language === 'es' ? esTranslations : enTranslations;
};

export const getTranslation = (language, key) => {
  const translations = getTranslations(language);
  const keys = key.split('.');
  let value = translations;

  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }

  return value || key;
};

export { esTranslations, enTranslations };
