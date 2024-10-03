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

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
            <div className='flex flex-col flex-grow items-center p-5'>
                <h1 className='text-3xl'>Client</h1>
                <p>{point.name}</p>
            </div>
            <footer className='flex flex-col gap-1 w-full p-3'>
                <Button label={t('CMN_BACK')} onClick={() => router.back()}/>
            </footer>        
            </main>
        </div>
    );
};

export default PointClientView;