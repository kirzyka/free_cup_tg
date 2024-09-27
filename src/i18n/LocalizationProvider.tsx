"use client";

import React, { createContext } from 'react';
import { TRANSLATIONS } from './Translations';
import { DEFAULT_LANG } from '@/client_const';
import { useSettings } from '@/hooks/useSettings';

interface Props {
  children: React.ReactNode 
}

export interface LocalizationContext {
  t: (key: string, values?: Record<string, string>) => string;
}

export const LocalizationContext = createContext<LocalizationContext | undefined>(undefined);

export function LocalizationProvider({ children }: Props) {
  const { language } = useSettings();
  const t = (key: string, values?: Record<string, string>) => {
    const translation: string = TRANSLATIONS[language]?.[key] || TRANSLATIONS[DEFAULT_LANG]?.[key] || key;

    return values ? translation.replace(/{\w+}/g, (match) => values[match.slice(1, -1)] || match) : translation;
  };

  return <LocalizationContext.Provider value={{ t }}>{children}</LocalizationContext.Provider>;
}
