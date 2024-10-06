"use client";

import Button from "@/component/button/Button";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import { Action } from "@/types/Action";
import Point from "@/types/Point";
import { getURL } from "@/utils/routerUtils";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import DeletePointView from "./DeletePointView";

interface Props {
    point: Point;
}

const PointBaristaView = ({point}: Props) => {
    const {t, language} = useLocale();
    const {deletePoint} = useContext(AppContext);
    const router = useRouter();    
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const description: string = t('SCR_DELETE_POINT_DESCRIPTION_BARISTA');

    const onAddCup = () => {        
        router.push(getURL(`/code/${Action.ADD_CUP}/${point.key}`, language));
    };

    const onAddPoint = () => {
        router.push(getURL(`/code/${Action.ADD_POINT}/${point.key}`, language));
    };
    
    const onGoToList = () => {
        router.back();
    };

    const onClone = () => {
        router.push(getURL(`/code/${Action.CLONE_POINT}/${point.key}`, language));
    };

    const onDelete = async () => {
        await deletePoint(point.key);
        router.push(getURL(`/`, language));
    };

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
                <div className='flex flex-col flex-grow items-center px-3 pt-8 w-full'>
                    <h1 className='text-3xl'>{point.name}</h1>
                </div>
                <footer className='flex flex-grow flex-col gap-1 w-full p-3 justify-end'>
                    {!isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_ADD_CUP')} onClick={onAddCup} />
                    )}
                    {!isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_ADD_POINT')} onClick={onAddPoint} />
                    )}
                    {!isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_POINTS')} onClick={onGoToList}/>
                    )}
                    {!isDetailsOpen && (
                        <Button label={t('CMN_MORE')} onClick={() => setIsDetailsOpen(true)} className="mt-3"/>
                    )}
                    {isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_CLONE_POINT')} onClick={onClone} />
                    )}
                    {isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_DELETE')} type="danger" onClick={() => setIsDeleteOpen(true)} />
                    )}
                    {isDetailsOpen && (
                        <Button label={t('CMN_BACK')} className="mt-3" onClick={() => setIsDetailsOpen(false)} />
                    )}
                </footer>        
            </main>
            {isDeleteOpen && (
                <DeletePointView point={point} description={description} onDelete={onDelete} onClose={() => setIsDeleteOpen(false)} />
            )}
        </div>
    );
};

export default PointBaristaView;