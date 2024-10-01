import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { LocalizationProvider } from '@/i18n/LocalizationProvider';
import { SUPPORTED_LANGS } from '@/i18n/Translations';
import { AppContextProvider } from '@/context/AppContextProvider';


export function generateStaticParams() {
	return SUPPORTED_LANGS.map(lang => ({ lang}));
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  if (!SUPPORTED_LANGS.includes(lang)) {
    notFound(); // 404, если локаль не поддерживается
  }

  return (
    <AppContextProvider>
      <LocalizationProvider language={lang}>
        {children}
      </LocalizationProvider>
    </AppContextProvider>
  );
}
