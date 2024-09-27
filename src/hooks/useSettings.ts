import { DEFAULT_LANG } from '@/client_const';
import { TRANSLATIONS } from '@/i18n/Translations';
import Settings from '@/types/Settings';

export function useSettings(): Settings {
  let appLang: string = DEFAULT_LANG;

  if (typeof window !== "undefined") {
    const langs: string[] = Object.keys(TRANSLATIONS);
    const clientLang: string = navigator.language || DEFAULT_LANG;

    appLang = langs.find((lang: string) => clientLang.includes(lang)) || DEFAULT_LANG;
  }

  return { language: appLang };
}
