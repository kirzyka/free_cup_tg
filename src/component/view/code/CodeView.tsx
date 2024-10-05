"use client";

import Button from "@/component/button/Button";
import QrCodeDisplay from "@/component/qr/QRCodeDisplay";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import { Action } from "@/types/Action";
import Point from "@/types/Point";
import {
    generateAddCupQRCode,
    generateAddPointQRCode,
    generateClonePointQRCode,
} from "@/utils/codeUtils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Props {
    action: Action;
    point_key: string;
}

const CodeView = ({ action, point_key }: Props) => {
    const { t } = useLocale();
    const { getPoint } = useContext(AppContext);
    const [qrCode, setQRCode] = useState<string>("");
    const router = useRouter();
    const [header, setHeader] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const qrCodeGenerator = {
        [Action.ADD_POINT as string]: generateAddPointQRCode,
        [Action.CLONE_POINT as string]: generateClonePointQRCode,
        [Action.ADD_CUP as string]: generateAddCupQRCode,
    }[action];

    const onBack = () => {
        router.back();
    };

    const generateCode = async (point: Point) => {
        const encoded: string = await qrCodeGenerator(point);

        setQRCode(encoded);
    };

    useEffect(() => {
        getPoint(point_key).then((point) => {
            if (point) {
                generateCode(point);
            }
        });
    }, []);

    useEffect(() => {
        switch (action) {
            case Action.ADD_CUP:
                setHeader(t("SCR_CODE_ADD_CUP_HEADER"));
                setDescription(t("SCR_CODE_ADD_CUP_DESCR"));
                break;
            case Action.ADD_POINT:
                setHeader(t("SCR_CODE_ADD_POINT_HEADER"));
                setDescription(t("SCR_CODE_ADD_POINT_DESCR"));
                break;
            case Action.CLONE_POINT:
                setHeader(t("SCR_CODE_CLONE_HEADER"));
                setDescription(t("SCR_CODE_CLONE_DESCR"));
                break;
        }
    }, [t, action]);

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
                <div className="flex items-center justify-center pt-8">
                    <h1 className="text-3xl">{header}</h1>
                </div>
                <div className="flex flex-col flex-grow items-center justify-center">
                    {qrCode && <QrCodeDisplay text={qrCode} />}
                    {!qrCode && <span>generating...</span>}
                </div>
                <div className="flex w-full items-center justify-center p-3">
                    <p>{description}</p>
                </div>
                <footer className="flex flex-col gap-1 w-full p-3">
                    <Button label={t("CMN_BACK")} onClick={onBack} />
                </footer>
            </main>
        </div>
    );
};

export default CodeView;
