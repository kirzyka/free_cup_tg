import { DEFAULT_LANG } from '@/constClient';
import da from './labels/da.json';
import de from './labels/de.json';
import en from './labels/en.json';
import es from './labels/es.json';
import fi from './labels/fi.json';
import fr from './labels/fr.json';
import it from './labels/it.json';
import nl from './labels/nl.json';
import no from './labels/no.json';
import pl from './labels/pl.json';
import ru from './labels/ru.json';
import sv from './labels/sv.json';
import uk from './labels/uk.json';

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  da, // Danish
  de, // German
  en, // English
  es, // Spanish
  fi, // Finnish
  fr, // French
  it, // Italian
  nl, // Netherlands
  no, // Norwegian
  pl, // Polish
  ru, // Russian
  sv, // Swedish
  uk, // Ukrainian
};

export const SUPPORTED_LANGS: string[] = Object.keys(TRANSLATIONS);

export function getTranslationFn(language: string = DEFAULT_LANG) {
  return (key: string, values?: Record<string, string>) => {
    const translation: string = TRANSLATIONS[language]?.[key] || TRANSLATIONS[DEFAULT_LANG]?.[key] || key;

    return values
      ? translation.replace(/{\w+}/g, (match) => values[match.slice(1, -1)] || match)
      : translation;
  };
};
