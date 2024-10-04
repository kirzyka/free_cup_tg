"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { getURL } from "@/utils/routerUtils";
import { Action } from "@/types/Action";
import { QR_CODE_TIMEOUT } from "@/client_const";
import { decryptData, generateHMAC } from "@/utils/cryptoUtils";
import { DATA_KEY } from "@/server-const";
import Point from "@/types/Point";
import { AppContext } from "@/context/AppContextProvider";

interface Props {
    action: Action;
}

const TYPE_TO_PAGE: Record<string, string> = {
    [Action.ADD_POINT]: "/",
    [Action.CLONE_POINT]: "/",
};

const ScanView = ({ action }: Props) => {
    const router = useRouter();
    const { t, language } = useLocale();
    const [inProgress, setInProgress] = useState(false);
    const { points } = useContext(AppContext);

    const onCodeScanned = async (data: string) => {
        if (!inProgress) {
            const decoded = decryptData(data, DATA_KEY);
            const { s: signature, ...decodedData } = JSON.parse(decoded);
            const {
                a: action,
                i: pointKey,
                /*n: pointName, c: cupCount, k: accessKey,*/ t: timestamp,
            } = decodedData;
            const point: Point | undefined = points.find(
                (p: Point) => p.key === pointKey
            );

            if (!point) {
                setInProgress(true);

                switch (action) {
                    case Action.CLONE_POINT:
                        //clonePoint(pointKey, pointName, cupCount, accessKey);
                        router.push(getURL(TYPE_TO_PAGE[action], language));
                        break;
                    case Action.ADD_POINT:
                        //addPoint(pointKey, pointName, cupCount, accessKey);
                        router.push(getURL(TYPE_TO_PAGE[action], language));
                        break;
                }

                return;
            }

            // check signature
            if (signature && point) {
                const calculatedSignature: string = await generateHMAC(
                    decodedData,
                    point.accessKey
                );

                if (calculatedSignature !== signature) {
                    return;
                }
            }

            // check timestamp
            const now: number = new Date().getTime();

            if (timestamp + QR_CODE_TIMEOUT < now || timestamp > now) {
                return;
            }

            if (action === Action.ADD_CUP) {
                setInProgress(true);
                //addCup(point);
                return;
            }
            console.log("not parsed");
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined" && window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;

            try {
                webApp.ready();
                webApp.onEvent("scanQrPopupClosed", () => {
                    router.push(getURL(TYPE_TO_PAGE[action], language));
                });

                webApp.showScanQrPopup(
                    {
                        text: "Пожалуйста, отсканируйте QR-код",
                    },
                    (result: string | null) => {
                        if (result) {
                            onCodeScanned(result);
                            /*
                            webApp.showAlert(
                                `QR-код найден: ${result} goto ${TYPE_TO_PAGE[action]}`
                            );
                            */
                        }
                        return true;
                    }
                );
            } catch (e: unknown) {
                console.log((e as Error).message);
            }
        }
    }, [action, router, language]);

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
                <div className="flex flex-col flex-grow items-center justify-center gap-3 p-5">
                    <h1 className="text-3xl">Scaning...</h1>
                </div>
                <footer className="flex flex-col gap-1 w-full p-3">
                    <Button
                        label={t("CMN_BACK")}
                        onClick={() => router.back()}
                    />
                </footer>
            </main>
        </div>
    );
};

export default ScanView;
