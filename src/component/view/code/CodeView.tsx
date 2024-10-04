"use client";

import Button from "@/component/button/Button";
import QrCodeDisplay from "@/component/qr/QRCodeDisplay";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import { Action } from "@/types/Action";
import Point from "@/types/Point";
import { encryptData } from "@/utils/cryptoUtils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Props {
    action: Action,
    point_key: string,
}
export const DATA_KEY: string = 'aB3#9xTzWq';
const CodeView = ({action, point_key}: Props) => {
    const {t} = useLocale();  
    const {getPoint} = useContext(AppContext);
    const [qrCode, setQRCode] = useState<string>('no signal');
    const router = useRouter();
    const [header, setHeader] = useState<string>('');

    const handleBack = () => {
        router.back();
    };

    const generateAddPointQRCode = async (point: Point) => {
        const data = {
            a: action,
            i: point.key,
            n: point.name,
            c: point.requiredCups,
            k: point.accessKey,
        };

        return encryptData(JSON.stringify(data), DATA_KEY);
    };

    const qrCodeGenerator = {
        [Action.ADD_POINT as string]: generateAddPointQRCode,
        //[Action.CLONE_POINT as string]: generateClonePointQRCode,
        //[Action.ADD_CUP as string]: generateAddCupQRCode,
      }[action];

      const generateCode = async (point: Point) => {
        if( point) {
            const encoded: string = await qrCodeGenerator(point);
        
            setQRCode(encoded);
        }
      };

      useEffect(() => {
        getPoint(point_key).then((point) => {
            if (point) {
                generateCode(point);
            }
        })
      }, []);

    useEffect(() => {
        if (action === Action.ADD_POINT) {
            setHeader(t('SCR_CODE_ADD_POINT_HEADER'));
        }
    }, [t, action]);

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
                <div className='flex items-center justify-center pt-8'>
                    <h1 className='text-3xl'>
                        {header}
                    </h1>                
                </div>
                <div className='flex flex-col flex-grow items-center justify-center'>
                    <QrCodeDisplay text={qrCode}/>
                </div>
                <footer className='flex flex-col gap-1 w-full p-3'>
                    <Button label={t('CMN_BACK')} onClick={handleBack}/>
                </footer>        
            </main>
        </div>
    );
};

export default CodeView;