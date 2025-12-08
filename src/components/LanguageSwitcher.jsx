import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center bg-neutral-900 rounded-full p-1 border border-neutral-800">
      <button
        onClick={() => changeLanguage('es')}
        className={`relative z-10 px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
          language === 'es'
            ? 'text-white'
            : 'text-neutral-400 hover:text-neutral-200'
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`relative z-10 px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
          language === 'en'
            ? 'text-white'
            : 'text-neutral-400 hover:text-neutral-200'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <motion.div
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
        initial={false}
        animate={{
          x: language === 'es' ? 2 : 'calc(100% + 4px)'
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
      />
    </div>
  );
}
