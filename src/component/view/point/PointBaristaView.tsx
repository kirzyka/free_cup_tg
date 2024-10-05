"use client";

import Button from "@/component/button/Button";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import { Action } from "@/types/Action";
import Point from "@/types/Point";
import { getURL } from "@/utils/routerUtils";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

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

    const onShowMoreBarista = () => {
        setIsDetailsOpen(true);
    };
    
    const onClone = () => {
        router.push(getURL(`/code/${Action.CLONE_POINT}/${point.key}`, language));
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
                <div className='flex flex-col flex-grow items-center px-3 pt-8 w-full'>
                    <h1 className='text-3xl'>{point.name}</h1>
                </div>
                <footer className='flex flex-grow flex-col gap-1 w-full p-3 justify-end'>
                    <Button label={t('SCR_POINT_BTN_ADD_CUP')} onClick={onAddCup} />
                    <Button label={t('SCR_POINT_BTN_ADD_POINT')} onClick={onAddPoint} />
                    <Button label={t('SCR_POINT_BTN_POINTS')} onClick={onGoToList}/>
                    {!isDetailsOpen && (
                        <Button label={t('CMN_MORE')} onClick={onShowMoreBarista} className="mt-3 text-2xl"/>
                    )}
                    {isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_CLONE_POINT')} onClick={onClone} />
                    )}
                    {isDetailsOpen && (
                        <Button label={t('SCR_POINT_BTN_DELETE')} type="danger" onClick={() => setIsDeleteOpen(true)} />
                    )}
                    {isDetailsOpen && (
                        <Button label={t('CMN_BACK')} className="mt-3" onClick={onBack} />
                    )}
                </footer>        
            </main>
            {isDeleteOpen && (
                <div className="flex items-center justify-center absolute w-full h-full backdrop-blur bg-transparent-400">
                    <div className="flex flex-col items-center justify-center w-full m-4 px-8 py-4 bg-content_b rounded-xl shadow-2xl">
                        <div className="flex flex-col gap-3 mb-5 w-full">
                            <h1 className="text-3xl">{t('SCR_DELETE_POINT_HEADER')}</h1>
                            <p className="text-2xl">[{point.name}]</p>
                        </div>
                        <div className="w-full mb-5">
                            <p>{description}</p>
                        </div>
                        <div className="flex flex-col gap-3 w-full ">
                            <Button label={t('CMN_DELETE')} type="danger" onClick={onDelete} />
                            <Button label={t('CMN_CLOSE')} onClick={() => setIsDeleteOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointBaristaView;