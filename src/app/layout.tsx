import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from 'next/dynamic';
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

export const metadata: Metadata = {
  title: "FreeCup",
  description: "Loaylty Card App",
};

const WindowExpander = dynamic(() => import('@/component/window/WindowExpander'), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WindowExpander/>
        <header id="custom-header" style={{backgroundColor: "#55423d", height: "50px"}}>
          Ваш заголовок
        </header>
        {children}
      </body>
    </html>
  );
}
