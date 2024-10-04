import { DATA_KEY } from "@/server-const";
import { Action } from "@/types/Action";
import Point from "@/types/Point";
import { encryptData, generateHMAC } from "./cryptoUtils";

export const generateAddPointQRCode = async (point: Point) => {
    const data = {
        a: Action.ADD_POINT,
        i: point.key,
        n: point.name,
        c: point.requiredCups,
        k: point.accessKey,
    };

    return encryptData(JSON.stringify(data), DATA_KEY);
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

    return encryptData(JSON.stringify(data), DATA_KEY);
  };

  export const generateAddCupQRCode = async (point: Point) => {
    const timestamp = Date.now();
    const data = {
      a: Action.ADD_CUP,
      i: point.key,
      t: timestamp,
    };
    const signature: string = await generateHMAC(data, point.accessKey);

    return encryptData(JSON.stringify({ ...data, s: signature }), DATA_KEY);
  };