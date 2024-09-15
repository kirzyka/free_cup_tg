'use client';
import { TelegramWebAppContainer } from '@telegram-web-app/core';
import { useEffect, useState } from 'react';

export default function Home() {
  const telegram = new TelegramWebAppContainer();
  const webApp = telegram.WebApp;
  const [msg, setMsg] = useState("");
  let code = "";

  const onScan = () => {
    code = "";
    try {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMsg(`Ошибка при вызове showScanQrPopup: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    // Инициализация Telegram Web App
    if (webApp) {
      webApp.expand(); // Разворачивает окно на весь экран
      webApp.onEvent('popupClosed', () => { //scanQrPopupClosed
        if (!code) {
          setMsg(''); // Очищаем сообщение при закрытии сканера    
        }        
      });
    } else {
        setMsg('Telegram WebApp API не доступен.');
    }    
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
            <h1>FreeCup</h1>
        </div>
        <div>
            <p>{msg}</p>
        </div>
        <div>
            <button onClick={onScan}>Сканировать QR-код</button>
        </div>
      </main>
    </div>
  );
}
