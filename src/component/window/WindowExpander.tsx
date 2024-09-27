'use client';

import { useEffect } from "react";

export default function WindowExpander() {  
    useEffect(() => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp; 
             
        webApp.expand(); 
        webApp.setHeaderColor("secondary_bg_color");
      //} else {
         // setMsg('Telegram WebApp API не доступен.');
      }    
    }, []);

    return null;
}
