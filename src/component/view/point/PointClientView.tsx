"use client";

import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import Point from "@/types/Point";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import DeletePointView from "./DeletePointView";
import { AppContext } from "@/context/AppContextProvider";
import { getURL } from "@/utils/routerUtils";
import Cup from "@/types/Cup";
import TileGrid from "@/component/tileGrid/TileGrid";

interface Props {
  point: Point;
}

const PointClientView = ({ point }: Props) => {
  const { t, language } = useLocale();
  const router = useRouter();
  const { cups, deletePoint } = useContext(AppContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const description: string = t("SCR_DELETE_POINT_DESCRIPTION_CLIENT");

  const onGetCup = () => {    
    router.push(getURL(`/scan`, language));
  };

  const getCups = (point: Point) => {
    const activeCups: Cup[] = cups.filter((cup: Cup) => cup.pointKey === point.key && cup.active);
    const list: (Cup | undefined)[] = activeCups.concat(Array.from({ length: point.requiredCups - activeCups.length }));

    return list
      .map((cup: Cup | undefined) => (
        {
          alt:"Картинка чашки",
          src: cup?.active ? "/images/cup_c.png" : "/images/cup_w.png",
        }
      ))
      .concat([
        {
          alt: "Картинка приза",
          src: activeCups.length === point.requiredCups ? "/images/gift_c.png" : "/images/gift_w.png",
        }
      ]);
  };

  const onGoToList = () => {
    router.push(getURL(`/`, language));
  };

  const onDelete = async () => {
    await deletePoint(point.key);
    onGoToList();
  };

  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <div className="flex flex-col flex-grow items-center px-3 pt-8 w-full">
          <h1 className="text-3xl">{point.name}</h1>
        </div>
        {!isDetailsOpen && (
            <div className="flex flex-grow w-full p-10 items-center justify-center">
                <TileGrid images={getCups(point)} columns={3}/>
            </div>
        )}
        <footer className="flex flex-grow flex-col gap-1 w-full p-3 justify-end">
            {!isDetailsOpen && (
                <Button label={t("SCR_POINT_BTN_GET_CUP")} onClick={onGetCup} />
            )}
            {!isDetailsOpen && (
                <Button label={t("SCR_POINT_BTN_POINTS")} onClick={onGoToList} />
            )}
            {!isDetailsOpen && (
                <Button label={t("CMN_MORE")} onClick={() => setIsDetailsOpen(true)} className="mt-3"/>
            )}
            {isDetailsOpen && (
                <Button label={t("SCR_POINT_BTN_DELETE")} type="danger" onClick={() => setIsDeleteOpen(true)}/>
            )}
            {isDetailsOpen && (
                <Button label={t("CMN_BACK")} className="mt-3" onClick={() => setIsDetailsOpen(false)} />
            )}
        </footer>
      </main>
      {isDeleteOpen && (
        <DeletePointView point={point} description={description} onDelete={onDelete} onClose={() => setIsDeleteOpen(false)}/>
      )}
    </div>
  );
};

export default PointClientView;
