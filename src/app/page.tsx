import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_LANG} from '@/client_const';
import { SUPPORTED_LANGS } from '@/i18n/Translations';

export default function HomeRedirect() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || DEFAULT_LANG;

  const clientLangs = acceptLanguage.split(',').map(lang => lang.trim().slice(0, 2));

  // Check if the client's preferred language is supported
  const supportedLang = clientLangs.find(lang => lang !== DEFAULT_LANG && SUPPORTED_LANGS.includes(lang));

  // If the client's preferred language is not supported, use the default language
  const lang = supportedLang || DEFAULT_LANG;

  // Redirect to the URL with the language prefix
  redirect(`/${lang}`);
}