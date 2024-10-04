"use client";

import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { Action } from "@/types/Action";
import Point from "@/types/Point";
import { getURL } from "@/utils/routerUtils";
import { useRouter } from "next/navigation";

interface Props {
    point: Point;
}

const PointBaristaView = ({point}: Props) => {
    const {t, language} = useLocale();
    const router = useRouter();

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
                <Button label={t('CMN_MORE')} onClick={onShowMoreBarista} className="mt-3 text-2xl"/>
            </footer>        
            </main>
        </div>
    );
};

export default PointBaristaView;