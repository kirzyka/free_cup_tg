"use server";

import QRCode from 'qrcode';

export const generateQRCode = async(code: string) => {
    const data: string = await QRCode.toDataURL(code);

    return data;
};