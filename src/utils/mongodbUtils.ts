import { MONGODB_URI } from '@/constServer';
import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || MONGODB_URI;
const client = new MongoClient(uri);

let dbConnection: Db | null = null;

export const connectToDatabase = async () => {
  if (!dbConnection) {
    await client.connect(); 
    dbConnection = client.db('freecup');
  }
  return dbConnection;
};
