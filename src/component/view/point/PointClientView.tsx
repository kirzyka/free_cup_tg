"use client";

import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import Point from "@/types/Point";
import { useRouter } from "next/navigation";

interface Props {
    point: Point;
}

const PointClientView = ({point}: Props) => {
    const {t} = useLocale();
    const router = useRouter();

    const onGetCup = () => {
    };

    const onGoToList = () => {
        router.back();
    };

    const onShowMoreClient = () => {
    };

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
            <div className='flex flex-col flex-grow items-center px-3 pt-8 w-full'>
                <h1 className='text-3xl'>{point.name}</h1>
            </div>
            <div className='flex flex-grow w-full p-3 items-center justify-center'>
                cups
            </div>
            <footer className='flex flex-col gap-1 w-full p-3 justify-end'>
                <Button label={t('SCR_POINT_BTN_GET_CUP')} onClick={onGetCup} />
                <Button label={t('SCR_POINT_BTN_POINTS')} onClick={onGoToList} />
                <Button label={t('CMN_MORE')} onClick={onShowMoreClient} className="mt-3 text-2xl"/>
            </footer>        
            </main>
        </div>
    );
};

export default PointClientView;