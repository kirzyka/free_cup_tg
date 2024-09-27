import { DEFAULT_LANG } from '@/client_const';
import { TRANSLATIONS } from '@/i18n/Translations';
import Settings from '@/types/Settings';

export function useSettings(): Settings {
  let deviceLanguage: string = DEFAULT_LANG;

  if (typeof window !== "undefined") {
    const langs: string[] = Object.keys(TRANSLATIONS);
    const clientLang: string = navigator.language || DEFAULT_LANG;

    deviceLanguage = langs.find(l => clientLang.includes(l)) || DEFAULT_LANG;
  }

  return { language: deviceLanguage };
}
