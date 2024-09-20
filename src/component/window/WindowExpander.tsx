'use client';

//import { BOT_KEY } from "@/constant";
import { TelegramWebAppContainer } from "@telegram-web-app/core";
import { useEffect } from "react";

export default function WindowExpander() {
    const {WebApp: webApp} = new TelegramWebAppContainer();    
    //const t = new TelegramBot(BOT_KEY || "", { polling: true });

  
    useEffect(() => {
      if (webApp) {          
        webApp.expand(); 
        webApp.setHeaderColor("secondary_bg_color");
      //} else {
         // setMsg('Telegram WebApp API не доступен.');
      }    
    }, []);

    return null;
}
