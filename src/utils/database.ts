import { MongoClient } from 'mongodb';

const client = new MongoClient(String(process.env.NEXT_PUBLIC_MONGODB_URI), {

});

export const connect = async () => {
  await client.connect();

  const db = client.db('futstack');
  return { db, client };
};
