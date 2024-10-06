"use client";

import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import Point from "@/types/Point";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import DeletePointView from "./DeletePointView";
import { AppContext } from "@/context/AppContextProvider";
import { getURL } from "@/utils/routerUtils";

interface Props {
  point: Point;
}

const PointClientView = ({ point }: Props) => {
  const { t, language } = useLocale();
  const router = useRouter();
  const { deletePoint } = useContext(AppContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const description: string = t("SCR_DELETE_POINT_DESCRIPTION_CLIENT");

  const onGetCup = () => {};

  const onGoToList = () => {
    router.back();
  };

  const onShowMoreClient = () => {
    setIsDetailsOpen(true);;
  };

  const onDelete = async () => {
    await deletePoint(point.key);
    router.push(getURL(`/`, language));
  };

  const onBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <div className="flex flex-col flex-grow items-center px-3 pt-8 w-full">
          <h1 className="text-3xl">{point.name}</h1>
        </div>
        <div className="flex flex-grow w-full p-3 items-center justify-center">
          cups
        </div>
        <footer className="flex flex-grow flex-col gap-1 w-full p-3 justify-end">
          <Button label={t("SCR_POINT_BTN_GET_CUP")} onClick={onGetCup} />
          <Button label={t("SCR_POINT_BTN_POINTS")} onClick={onGoToList} />
          {!isDetailsOpen && (
            <Button label={t("CMN_MORE")} onClick={onShowMoreClient} className="mt-3 text-2xl"/>
          )}
          {isDetailsOpen && (
            <Button label={t("SCR_POINT_BTN_DELETE")} type="danger" onClick={() => setIsDeleteOpen(true)}/>
          )}
          {isDetailsOpen && (
            <Button label={t("CMN_BACK")} className="mt-3" onClick={onBack} />
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
