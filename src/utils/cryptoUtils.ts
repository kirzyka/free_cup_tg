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