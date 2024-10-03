"use client";

import Button from "@/component/button/Button";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import { useContext } from "react";

const PointsView = () => {
    const {t} = useLocale();
    const {points} = useContext(AppContext);

    return (
        <div className="flex items-center w-full h-full justify-center [family-name:var(--font-geist-sans)]">
        <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
          <div className='flex flex-row items-center justify-center pt-8'>
            <h1 className='text-4xl font-bold'>{t("SCR_POINTS_HEADER")}</h1>
          </div>
          <div className='flex flex-col flex-grow w-full p-3'>
            {points.map(p => <p key={p.key}>{p.name}</p>)}
          </div>
          <footer className='w-full p-3'>
            <Button label={t("SCR_POINTS_BTN_ADD_POINT")} url="/role"/>
          </footer>        
        </main>
      </div>

    );<div><p>POINTS</p>{points.map(p => <p key={p.key}>{p.name}</p>)}</div>

};

export default PointsView;