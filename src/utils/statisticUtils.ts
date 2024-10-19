import { connectToDatabase } from './mongodbUtils';

export const updateDailyStatistics = async (userId: number) => {
  const db = await connectToDatabase();
  const collection = db.collection('statistics');

  const today = new Date().toISOString().split('T')[0]; 
  
  const stat = await collection.findOne({ date: today });

  if (stat) {    
    await collection.updateOne(
      { _id: stat._id },
      { $addToSet: { uniqueUsers: userId } }
    );
  } else {
    await collection.insertOne({
      date: today,
      uniqueUsers: [userId]
    });
  }
};

export const getDailyStats = async () => {
  const db = await connectToDatabase();
  const collection = db.collection('statistics');

  const today = new Date().toISOString().split('T')[0]; 

  const stat = await collection.findOne({ date: today });

  if (stat) {
    return stat.uniqueUsers.length; 
  } else {
    return 0; 
  }
};

export const getMonthlyStats = async () => {
  const db = await connectToDatabase();
  const collection = db.collection('statistics');

  const currentMonth = new Date().toISOString().slice(0, 7); 

  const stats = await collection.find({ date: { $regex: `^${currentMonth}` } }).toArray();

  const uniqueUsers = new Set<number>();

  stats.forEach(stat => {
    stat.uniqueUsers.forEach((userId: number) => {
      uniqueUsers.add(userId);
    });
  });

  return uniqueUsers.size;
};
