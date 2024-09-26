"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Button from "@/component/button/Button";

const ScanView = () => {
  const router = useRouter();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;

      try {
        webApp.ready();
        webApp.onEvent('scanQrPopupClosed', () => {
          router.back();
        });

        webApp.showScanQrPopup({
          text: 'Пожалуйста, отсканируйте QR-код',
        }, (result: string | null) => {
          if (result) {
            setCode(result);
            webApp.showAlert(result);
          }
          return true;
        });
      } catch (e: unknown) {
        console.log((e as Error).message);
      }
    }
  }, [router]);  // Add router to the dependency array

  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <div className='flex flex-col flex-grow items-center justify-center gap-3 p-5'>
          <h1 className='text-3xl'>Scan result:</h1>
          <p>{code}</p>
        </div>
        <footer className='flex flex-col gap-1 w-full p-3'>
          <Button label="Back" url="/"/>
        </footer>        
      </main>
    </div>
  );
};

export default ScanView;
