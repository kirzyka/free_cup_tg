import Cup from '@/types/Cup';
import Point from '@/types/Point';
import { openDB, DBSchema } from 'idb';

interface FreeCupDB extends DBSchema {
  points: {
    key: string;
    value: Point;
  };
  cups: {
    key: string;
    value: Cup;
  };
}

const DB_NAME = 'FreeCupDB';
const DB_VERSION = 1;

export async function openFreeCupDB() {
  return openDB<FreeCupDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('points')) {
        db.createObjectStore('points', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('cups')) {
        db.createObjectStore('cups', { keyPath: 'id' });
      }
    },
  });
}

export async function dbGetPoints(): Promise<Point[]> {
  const db = await openFreeCupDB();

  return db.getAll('points');
}

export async function dbGetPoint(point_key: string): Promise<Point | undefined> {
  const db = await openFreeCupDB();

  return db.get('points', point_key);
}

export async function dbAddPoint(point: Point) {
  const db = await openFreeCupDB();

  return db.add('points', point);
}

export async function dbDeletePoint(point_key: string) {
  const db = await openFreeCupDB();

  return db.delete('points', point_key);
}

export async function dbGetCups(): Promise<Cup[]> {
  const db = await openFreeCupDB();

  return db.getAll('cups');
}

export async function dbAddCup(point: Point) {
  const db = await openFreeCupDB();

  return db.add('cups', {
    id: Date.now(),
    pointKey: point.key,
    drinkType: "M",
    cupCount: 1,
    active: true,
    addedOn: new Date().toISOString(),    
  });
}

export async function dbDeactivateCups(point_key: string) {
  const db = await openFreeCupDB();
  const tx = db.transaction('cups', 'readwrite');
  const store = tx.objectStore('cups');
  let cursor = await store.openCursor();

  while (cursor) {
    const record = cursor.value;

    if (record.pointKey === point_key) {
      record.active = false;
      await cursor.update(record);
    }

    cursor = await cursor.continue();
  }

  await tx.done;
}
