'use client';

import { TelegramWebAppContainer } from "@telegram-web-app/core";
import { useEffect } from "react";

export default function WindowExpander() {
    const telegram = new TelegramWebAppContainer();
    const webApp = telegram.WebApp;
  
    useEffect(() => {
      if (webApp) {          
        webApp.expand(); 
        const style: CSSStyleDeclaration | undefined = document.querySelector('header')?.style;
        if (style) {
            style.backgroundColor = '#55423d';
        }
      //} else {
         // setMsg('Telegram WebApp API не доступен.');
      }    
    }, []);

    return null;
}
