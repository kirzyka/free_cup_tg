"use client";

import Button from "@/component/button/Button";
import { useLabel } from "@/hooks/useLabel";

const MainView = () => {
  const {t} = useLabel();

  return (
    <div className="flex items-center w-full h-full justify-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <span className="text-xs absolute top-2 right-2">v 0.0.3</span>
        <div className='flex flex-col flex-grow items-center justify-center'>
          <h1 className='text-3xl'>FreeCup </h1>
        </div>
        <footer className='w-full p-3'>
          <Button label={t("SCR_POINTS_BTN_ADD_POINT")} url="/role"/>
        </footer>        
      </main>
    </div>
  );
};  


export default MainView;