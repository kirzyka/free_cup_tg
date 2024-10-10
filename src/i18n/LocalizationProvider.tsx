"use client";

import { createContext } from 'react';
import { getTranslationFn } from './Translations';

export interface LocalizationContext {
  language: string;
  t: (key: string, values?: Record<string, string>) => string;
}

export const LocalizationContext = createContext<LocalizationContext | undefined>(undefined);

export function LocalizationProvider({ children, language }: { children: React.ReactNode, language: string }) {
  const t = getTranslationFn(language);

  return (
    <LocalizationContext.Provider value={{ language, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}