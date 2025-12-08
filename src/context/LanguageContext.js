import { createContext, useContext, useState, useEffect } from 'react';
import esTranslations from '@/locales/es.json';
import enTranslations from '@/locales/en.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage && (storedLanguage === 'es' || storedLanguage === 'en')) {
      setLanguage(storedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language preference to localStorage when it changes
  const changeLanguage = (newLanguage) => {
    if (newLanguage === 'es' || newLanguage === 'en') {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
    }
  };

  // Get nested value from object using dot notation (e.g., "hero.greeting")
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const value = {
    language,
    changeLanguage,
    isLoaded,
    t: (key) => {
      const translations = language === 'es' ? esTranslations : enTranslations;
      const translation = getNestedValue(translations, key);
      return translation || key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
