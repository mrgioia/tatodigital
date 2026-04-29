'use client';

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { Language, content } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  const val = localStorage.getItem('tato-lang');
  return (val === 'pt' || val === 'en' ? val : 'pt') as Language;
}

function getServerSnapshot() {
  return 'pt' as Language;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [internalLanguage, setInternalLanguage] = useState<Language | null>(null);
  
  const savedLanguage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  const language = internalLanguage || savedLanguage;

  const setLanguage = (lang: Language) => {
    setInternalLanguage(lang);
    localStorage.setItem('tato-lang', lang);
    // Dispatch a storage event so other useSyncExternalStore hooks in the same window (if any) could sync
    window.dispatchEvent(new Event('storage'));
  };

  const t = content[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
