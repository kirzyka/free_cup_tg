"use client";

import Button from "@/component/button/Button";
import QrCodeDisplay from "@/component/qr/QRCodeDisplay";
import { useLocale } from "@/hooks/useLocale";

const CodeView = () => {
    const {t} = useLocale();

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
            <div className='flex flex-col flex-grow items-center justify-center'>
                <h1 className='text-3xl'>
                    {t('SCR_CODE_CLONE_HEADER')}
                </h1>
                <QrCodeDisplay text="Boroda2024_1234567890_CoffeeShop_0987654321"/>
            </div>
            <footer className='flex flex-col gap-1 w-full p-3'>
                <Button label={t('CMN_BACK')} url="/"/>
            </footer>        
            </main>
        </div>
    );
};

export default CodeView;