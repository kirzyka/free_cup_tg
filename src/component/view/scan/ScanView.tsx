"use client";

//import { TelegramWebAppContainer,  } from "@telegram-web-app/core";
import { useEffect, useState } from "react";
import Button from "@/component/button/Button";

const ScanView = () => {
  const [webApp, setWebApp] = useState<WebApp | null>(null); 
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const openScanQrPopup = () => {  
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
        //webApp.closeScanQrPopup();
        return true;
      });        
    } catch (e: unknown) {
      setError((e as Error).message);
    }    
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const _webApp = window.Telegram.WebApp;

      _webApp.ready();
      _webApp.onEvent('scanQrPopupClosed', () => {
        setMsg('Окно закрыто');
      }); 

      setWebApp(_webApp);
      openScanQrPopup();
      //console.log("Пользователь Telegram:", webApp.initDataUnsafe?.user?.first_name);
      //webApp.MainButton.setText("Нажмите меня!");
      //webApp.MainButton.show();
    }
  }, []);

  useEffect(() => {
    if (webApp) {
      openScanQrPopup();
    } else {
      setMsg('Telegram WebApp API не доступен.');
    }  
  }, [webApp]);
 /* 
  useEffect(() => {
    webApp.onEvent('popupClosed', () => { //scanQrPopupClosed
      setMsg('Окно закрыто');
    }); 
    webApp.onEvent('qrTextReceived', (data: QrTextReceivedCallbackData) => {
      setMsg('Код получен:' + data.data);
    });
    openScanQrPopup();
  }, []); 
*/
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
        <Button label="Scan again" onClick={openScanQrPopup}/>
        <Button label="Back" url="/"/>
      </footer>        
      </main>
  </div>
  );
};  


export default ScanView;