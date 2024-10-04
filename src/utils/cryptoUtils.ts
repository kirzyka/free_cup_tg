//import * as crypto from 'crypto';
import CryptoJS from 'crypto-js';

export const encryptData = (text: string, key: string): string => {
  // Генерация случайного вектора инициализации (IV)
  const ivArray = crypto.getRandomValues(new Uint8Array(16));//crypto.randomBytes(16);
  const iv = CryptoJS.lib.WordArray.create(ivArray);

  // Хэширование ключа для использования в AES
  const hashedKey = CryptoJS.SHA256(key).toString();

  // Шифрование текста с использованием ключа и вектора инициализации (IV)
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Hex.parse(hashedKey), {
    iv: iv
  }).toString();

  // Конкатенация IV и зашифрованного текста
  const ivAndEncrypted = iv.toString() + encrypted;

  // Преобразование в Base64 для удобства хранения
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(ivAndEncrypted));
};


export async function generateHMAC(
  data: object,
  accessKey: string
): Promise<string> {
  const message = JSON.stringify(data);
  const enc = new TextEncoder();
  const keyData = enc.encode(accessKey);
  const messageData = enc.encode(message);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
