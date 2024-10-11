"use server";

import { DATA_KEY } from "@/constServer";
import { decryptData, encryptData } from "@/utils/cryptoUtils";

export const encrypt = (data: string): string => {
    return encryptData(data, DATA_KEY);
};

export const decrypt = (code: string): string => {
    return decryptData(code, DATA_KEY);        
};