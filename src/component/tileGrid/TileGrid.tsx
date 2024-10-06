"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface TileGridProps {
  images: { src: string; alt: string }[]; // Массив изображений с src и alt
  columns: number; // Количество столбцов
}

const TileGrid: React.FC<TileGridProps> = ({ images, columns }) => {
  const [tileSize, setTileSize] = useState(0); // Размер каждой плитки (ширина и высота)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Рассчитываем размеры плиток при изменении ширины окна или контейнера
  useEffect(() => {
    const calculateTileSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const size = containerWidth / columns; // Ширина каждой плитки
        console.log(size, containerWidth, columns);
        setTileSize(size); // Устанавливаем размер плитки
      }
    };

    // Вызываем при первом рендере
    calculateTileSize();

    // Обновляем размеры при изменении размера окна
    window.addEventListener('resize', calculateTileSize);
    return () => window.removeEventListener('resize', calculateTileSize);
  }, [columns]);

  return (
    <div
      ref={containerRef}
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`, // Сетка с количеством столбцов
      }}
    >
      {images.map((image, index) => (
        <div key={index} style={{ width: tileSize, height: tileSize, padding: 10 }}>
          <Image
            src={image.src}
            alt={image.alt}
            layout="responsive"
            width={tileSize - 20}
            height={tileSize - 20}
            objectFit="cover" // Картинка адаптируется под размер
          />
        </div>
      ))}
    </div>
  );
};

export default TileGrid;
