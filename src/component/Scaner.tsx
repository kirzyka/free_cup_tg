"use client";

import { TelegramWebAppContainer } from "@telegram-web-app/core";
import { useEffect, useState } from "react";

export default function Scaner() {
    const telegram = new TelegramWebAppContainer();
    const webApp = telegram.WebApp;
    const [msg, setMsg] = useState("");
    let code = "";  

    const onScan = () => {
      setMsg('');
      
      try {
        if (typeof window !== 'undefined') {
          webApp.showScanQrPopup({
              text: 'Пожалуйста, отсканируйте QR-код'
          }, (result: string | null) => {
              if (result) {
                  code = result;
                  setMsg(`QR-код найден: ${result}`);
              } else {
                  setMsg('QR-код не найден');
              }
              webApp.closeScanQrPopup();
              return true;
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMsg(`Ошибка при вызове showScanQrPopup: ${error.message}`);
        }
      }
    };

    useEffect(() => {
      webApp.onEvent('popupClosed', () => { //scanQrPopupClosed
        if (!code) {
          setMsg('');
        }        
      });  
    }, []);

    return (
      <div>
        <div>
            <h1>FreeCup</h1>
        </div>
        <div>
            <p>{msg}</p>
        </div>
        <div>
            <button onClick={onScan}>Сканировать QR-код</button>
        </div>
      </div>
    );

  }