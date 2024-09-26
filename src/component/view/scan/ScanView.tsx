"use client";

import { TelegramWebAppContainer } from "@telegram-web-app/core";
import { useEffect, useState } from "react";
import Button from "@/component/button/Button";
import Error from "next/error";

type ScanViewError = Error | null;

const ScanView = () => {
  const telegram = new TelegramWebAppContainer();
  const webApp = telegram.WebApp;
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");

  const openScanQrPopup = () => {  
    try {
      webApp.showScanQrPopup({
        text: 'Пожалуйста, отсканируйте QR-код'
      }, (result: string | null) => { 
        if (result) {
          setCode(result);
          setMsg(`QR-код найден: ${result}`);
        } else {
          setMsg('QR-код не найден');
        }
        webApp.closeScanQrPopup();
        return true;
      });
    } catch (e: unknown) {
      setMsg((e as Error).toString());
    }
    
  };
  
  useEffect(() => {
    webApp.onEvent('popupClosed', () => { //scanQrPopupClosed
      setMsg('Окно закрыто');
    }); 
    openScanQrPopup();
  }, []); 

  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
      <div className='flex flex-col flex-grow items-center justify-center gap-3 p-5'>
          <h1 className='text-3xl'>Scan result:</h1>
          <p>{msg} - {code}</p>
      </div>
      <footer className='flex flex-col gap-1 w-full p-3'>
        <Button label="Scan" onClick={openScanQrPopup}/>
        <Button label="Back" url="/"/>
      </footer>        
      </main>
  </div>
  );
};  


export default ScanView;