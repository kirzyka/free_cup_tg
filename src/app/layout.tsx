import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from "next/script";
import "./globals.css";

// Подключаем Inter с весами 400 и 700
const inter = Inter({
  subsets: ['latin', 'cyrillic'], // Подключаем нужные наборы символов (например, для кириллицы)
  weight: ['400', '700'],         // Указываем веса
  display: 'swap',                // Свойство для лучшей загрузки шрифта
  variable: '--font-inter',
});

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
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />      
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <WindowExpander/>
          {children}
      </body>
    </html>
  );
}
