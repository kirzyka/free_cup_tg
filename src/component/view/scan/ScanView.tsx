"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Button from "@/component/button/Button";


const ScanView = () => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;

      webApp.ready();
      webApp.onEvent('scanQrPopupClosed', () => {
        setMsg('Окно закрыто');
        router.back();
      }); 

      try {
        webApp!.showScanQrPopup({
          text: 'Пожалуйста, отсканируйте QR-код',
          
        }, (result: string | null) => { 
          if (result) {
            setCode(result);
            setMsg(`QR-код найден: ${result}`);
          } else {
            setMsg('QR-код не найден');
          }
          return true;
        });        
      } catch (e: unknown) {
        setError((e as Error).message);
      }    
      //console.log("Пользователь Telegram:", webApp.initDataUnsafe?.user?.first_name);
      //webApp.MainButton.setText("Нажмите меня!");
      //webApp.MainButton.show();
    }
  }, []);

  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
      <div className='flex flex-col flex-grow items-center justify-center gap-3 p-5'>
          <h1 className='text-3xl'>Scan result:</h1>
          <p>{code}</p>
          <p>{msg}</p>
          <p>{error}</p>
      </div>
      <footer className='flex flex-col gap-1 w-full p-3'>
        <Button label="Back" url="/"/>
      </footer>        
      </main>
  </div>
  );
};  


export default ScanView;