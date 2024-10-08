"use client";

import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "next/navigation";

const CloneOrNewPointView = () => {
    const {t} = useLocale();
    const router = useRouter();

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
            <div className='flex flex-grow items-center p-5'>
                <h1 className='text-3xl'>{t("SCR_CLONE_OR_NEW_HEADER")}</h1>
            </div>
            <footer className='flex flex-col gap-1 w-full p-3'>
                <Button label={t("SCR_CLONE_OR_NEW_LBL_NEW")} url="/point/register"/>
                <Button label={t("SCR_CLONE_OR_NEW_LBL_GET")} url="/scan"/>
                <Button label={t('CMN_BACK')} onClick={() => router.back()}/>
            </footer>        
            </main>
        </div>
    );
};

export default CloneOrNewPointView;