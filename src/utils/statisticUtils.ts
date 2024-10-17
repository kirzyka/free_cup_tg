import fs from 'fs';
import path from 'path';

const statsFilePath = path.resolve(process.cwd(), 'data', 'statistics.json');

// Тип данных для статистики
type Statistics = {
  uniqueUsers: Set<number>; // Используем Set для уникальных пользователей
};

// Функция чтения статистики из файла
const readStatistics = (): Record<string, Statistics> => {
  try {
    const data = fs.readFileSync(statsFilePath, 'utf8');
    const parsedData = JSON.parse(data);

    // Преобразуем массивы обратно в Set<number> для уникальных пользователей
    for (const day in parsedData) {
      parsedData[day].uniqueUsers = new Set<number>(parsedData[day].uniqueUsers);
    }

    return parsedData;
  } catch (error) {
    return {};
  }
};

// Функция записи статистики в файл
const writeStatistics = (data: Record<string, Statistics>) => {
  // Преобразуем Set в массив перед записью
  const dataToSave = JSON.parse(JSON.stringify(data, (key, value) =>
    value instanceof Set ? Array.from(value) : value
  ));

  fs.writeFileSync(statsFilePath, JSON.stringify(dataToSave, null, 2), 'utf8');
};

// Функция для обновления статистики
export const updateDailyStatistics = (userId: number) => {
  const today = new Date().toISOString().split('T')[0]; // Получаем дату в формате YYYY-MM-DD
  const stats = readStatistics();

  // Если для текущего дня еще нет данных, создаем запись
  if (!stats[today]) {
    stats[today] = {
      uniqueUsers: new Set<number>(),
    };
  }

  // Добавляем пользователя в Set уникальных пользователей за текущий день
  stats[today].uniqueUsers.add(userId);

  // Записываем обновленную статистику в файл
  writeStatistics(stats);
};

// Получить статистику за день
export const getDailyStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const stats = readStatistics();

  if (!stats[today]) {
    return 0;
  }

  return stats[today].uniqueUsers.size;
};

// Получить статистику за месяц
export const getMonthlyStats = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // Формат YYYY-MM
  const stats = readStatistics();
  const uniqueUsers = new Set<number>();

  // Проходим по всем дням текущего месяца и собираем уникальных пользователей
  for (const day in stats) {
    if (day.startsWith(currentMonth)) {
      stats[day].uniqueUsers.forEach((userId: number) => {
        uniqueUsers.add(userId);
      });
    }
  }

  return uniqueUsers.size;
};
