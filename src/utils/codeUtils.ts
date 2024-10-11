import { Action } from "@/types/Action";
import Point from "@/types/Point";
import { generateHMAC } from "./cryptoUtils";
import { encrypt } from "@/service/CryptoService";

export const generateAddPointQRCode = async (point: Point) => {
    const data = {
        a: Action.ADD_POINT,
        i: point.key,
        n: point.name,
        c: point.requiredCups,
        k: point.accessKey,
    };

    console.log("Add point", data);
    return encrypt(JSON.stringify(data));
};

export const generateClonePointQRCode = async (point: Point) => {
    const timestamp = Date.now();
    const data = {
        a: Action.CLONE_POINT,
        i: point.key,
        n: point.name,
        c: point.requiredCups,
        k: point.accessKey,
        t: timestamp,
    };

    return encrypt(JSON.stringify(data));
};

export const generateAddCupQRCode = async (point: Point) => {
    const timestamp = Date.now();
    const data = {
        a: Action.ADD_CUP,
        i: point.key,
        t: timestamp,
    };
    const signature: string = await generateHMAC(data, point.accessKey);

    return encrypt(JSON.stringify({ ...data, s: signature }));
};
