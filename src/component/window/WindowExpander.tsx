'use client';

import { TelegramWebAppContainer } from "@telegram-web-app/core";
import { useEffect } from "react";

export default function WindowExpander() {
    const telegram = new TelegramWebAppContainer();
    const webApp = telegram.WebApp;
  
    useEffect(() => {
      if (webApp) {          
        webApp.expand(); 
      //} else {
         // setMsg('Telegram WebApp API не доступен.');
      }    
    }, []);

    return null;
}
