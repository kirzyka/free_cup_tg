import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_LANG} from '@/client_const';
import { SUPPORTED_LANGS } from '@/i18n/Translations';

export default function HomeRedirect() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || DEFAULT_LANG;
  const clientLang = acceptLanguage.split(',')[0].slice(0, 2); // Например, "ru-RU" -> "ru"

  // Если локаль поддерживается, используем её, иначе применяем локаль по умолчанию
  const lang = SUPPORTED_LANGS.includes(clientLang) ? clientLang : DEFAULT_LANG;

  // Редирект на URL с языковым префиксом
  redirect(`/${lang}`);
}