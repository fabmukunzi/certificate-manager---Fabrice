import { createContext, useState, useContext, ReactNode, FC } from 'react';
import de from '@/utils/data/locales/de.json';
import en from '@/utils/data/locales/en.json';

export type Language = 'en' | 'de';

interface Translations {
  [key: string]: string;
}

interface AppContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useTranslate = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useTranslate must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const translations: Record<Language, Translations> = { en, de };
  const translate = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      return key;
    }
    return translation;
  };
  return (
    <AppContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </AppContext.Provider>
  );
};
