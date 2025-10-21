import { createContext, useContext, useState, useEffect } from 'react';

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

  const value = {
    language,
    changeLanguage,
    isLoaded,
    t: (key, translations) => {
      // Simple translation function
      // translations should be an object with 'es' and 'en' keys
      return translations?.[language] || key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
