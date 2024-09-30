import Image from 'next/image';
import { useState, useEffect } from 'react';

interface QrCodeDisplayProps {
  text: string;
}

export default function QrCodeDisplay({ text }: QrCodeDisplayProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    // Функция для запроса QR-кода с сервера
    const fetchQrCode = async () => {
      try {
        const response = await fetch(`/api/qrcode?text=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (data.qrCodeDataURL) {
          setQrCode(data.qrCodeDataURL);
        }
      } catch (error) {
        console.error('Ошибка при получении QR-кода:', error);
      }
    };

    fetchQrCode();
  }, [text]);

  return (
    <div>
      {qrCode ? <Image src={qrCode} alt="QR Code" width={300} height={300} /> : <p>Загрузка QR-кода...</p>}
    </div>
  );
}
