import type { Metadata } from "next";
import { headers } from 'next/headers';
import localFont from "next/font/local";
import dynamic from 'next/dynamic';
import Script from "next/script";
import { LocalizationProvider } from "@/i18n/LocalizationProvider";
import { DEFAULT_LANG } from "@/client_const";
import { TRANSLATIONS } from "@/i18n/Translations";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

async function getLanguageFromHeaders(): Promise<string> {
  const headersList = headers(); // Получаем заголовки
  const acceptLanguage = headersList.get('accept-language') || DEFAULT_LANG;
  const langs = Object.keys(TRANSLATIONS);
  const clientLang = acceptLanguage.split(',')[0]; // Например, "ru-RU" -> "ru"
  return langs.find((lang) => clientLang.includes(lang)) || DEFAULT_LANG;
}

export const metadata: Metadata = {
  title: "FreeCup",
  description: "Loaylty Card App",
};

const WindowExpander = dynamic(() => import('@/component/window/WindowExpander'), { ssr: false });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getLanguageFromHeaders(); // Получаем локаль на сервере

  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />      
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WindowExpander/>
        <LocalizationProvider language={language}>
          {children}
        </LocalizationProvider>
      </body>
    </html>
  );
}
