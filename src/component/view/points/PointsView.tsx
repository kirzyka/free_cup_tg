"use client";

import Button from "@/component/button/Button";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import Point from "@/types/Point";
import { getURL } from "@/utils/routerUtils";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const PointsView = () => {
    const {t, language} = useLocale();
    const router = useRouter();
    const {points} = useContext(AppContext);
    const handleOpenDetails = () => {
        router.push(getURL("/point", language));
    };

    return (
        <div className="flex items-center w-full h-full justify-center [family-name:var(--font-geist-sans)]">
        <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
          <div className='flex flex-row items-center justify-center pt-8'>
            <h1 className='text-4xl font-bold'>{t("SCR_POINTS_HEADER")}</h1>
          </div>
          <div className='flex flex-col flex-grow w-full overflow-y-auto p-3'>
            {
              points.map((p: Point) => (
                <p key={p.key} className="border-b border-content_b text-2xl font-bold py-2" onClick={handleOpenDetails}>
                  {p.name}
                </p>
              ))
            }
          </div>
          <footer className='w-full p-3'>
            <Button label={t("SCR_POINTS_BTN_ADD_POINT")} url="/role"/>
          </footer>        
        </main>
      </div>

    );
};

export default PointsView;