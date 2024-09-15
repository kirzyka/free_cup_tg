"use client";

import { TelegramWebAppContainer } from "@telegram-web-app/core";
import { useEffect, useState } from "react";

export default function Scaner() {
    const telegram = new TelegramWebAppContainer();
    const webApp = telegram.WebApp;
    const [msg, setMsg] = useState("");
    let code = "";  

    const onScan = () => {
        code = "";
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
    
            setMsg(''); // Очищаем сообщение о вызове сканера
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setMsg(`Ошибка при вызове showScanQrPopup: ${error.message}`);
          }
        }
    };

    useEffect(() => {
        // Инициализация Telegram Web App
        if (webApp) {
          if (typeof window !== 'undefined') {
          webApp.expand(); // Разворачивает окно на весь экран
          webApp.onEvent('popupClosed', () => { //scanQrPopupClosed
            if (!code) {
              setMsg(''); // Очищаем сообщение при закрытии сканера    
            }        
          });
        }
        } else {
            setMsg('Telegram WebApp API не доступен.');
        }    
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