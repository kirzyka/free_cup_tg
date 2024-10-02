import Cup from '@/types/Cup';
import Point from '@/types/Point';
import { openDB, DBSchema } from 'idb';

// Определяем схему базы данных
interface CoffeeJournalDB extends DBSchema {
  points: {
    key: string;
    value: Point;
  };
  cups: {
    key: string;
    value: Cup;
  };
}

// Функция для открытия базы данных
const DB_NAME = 'FreeCupDB';
const DB_VERSION = 1;

export async function openCoffeeJournalDB() {
  return openDB<CoffeeJournalDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Создаём хранилища данных при инициализации
      if (!db.objectStoreNames.contains('points')) {
        db.createObjectStore('points', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('cups')) {
        db.createObjectStore('cups', { keyPath: 'id' });
      }
    },
  });
}

// Получить список кофеен
export async function getPoints(): Promise<Point[]> {
  const db = await openCoffeeJournalDB();

  return db.getAll('points');
}

// Сохранить кофейню
export async function addPoint(point: Point) {
  const db = await openCoffeeJournalDB();

  return db.add('points', point);
}

/*
// Получить все покупки
export async function getPurchases(): Promise<PurchaseRecord[]> {
  const db = await openCoffeeJournalDB();
  return db.getAll('purchases');
}

// Добавить новую покупку
export async function addPurchase(purchase: PurchaseRecord) {
  const db = await openCoffeeJournalDB();
  return db.add('purchases', purchase);
}
  */
