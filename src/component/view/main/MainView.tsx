"use client";

import Image from 'next/image';
import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { VERSION } from '@/client_const';

const MainView = () => {
  const {t} = useLocale();

  return (
    <div className="flex items-center w-full h-full justify-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <span className="text-xs absolute top-2 right-2">{VERSION}</span>
        <div className='flex flex-row flex-grow items-center justify-center'>
          <Image src="/images/cup_c.png" alt="Картинка чашки" width={64} height={64} />
          <h1 className='text-4xl font-bold'>FreeCup</h1>
        </div>
        <footer className='w-full p-3'>
          <Button label={t("SCR_POINTS_BTN_ADD_POINT")} url="/role"/>
        </footer>        
      </main>
    </div>
  );
};  


export default MainView;