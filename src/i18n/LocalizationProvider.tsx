"use client";

import { createContext, useContext } from 'react';
import { TRANSLATIONS } from '@/i18n/Translations';
import { DEFAULT_LANG } from '@/client_const';

export interface LocalizationContext {
  language: string;
  t: (key: string, values?: Record<string, string>) => string;
}

export const LocalizationContext = createContext<LocalizationContext | undefined>(undefined);

export function LocalizationProvider({ children, language }: { children: React.ReactNode, language: string }) {
  const t = (key: string, values?: Record<string, string>) => {
    const translation: string = TRANSLATIONS[language]?.[key] || TRANSLATIONS[DEFAULT_LANG]?.[key] || key;

    return values
      ? translation.replace(/{\w+}/g, (match) => values[match.slice(1, -1)] || match)
      : translation;
  };

  return (
    <LocalizationContext.Provider value={{ language, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLabel = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLabel must be used within a LocalizationProvider");
  }
  return context;
};
