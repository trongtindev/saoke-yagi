import { MongoClient } from 'mongodb';

export const getDb = async () => {
  const { MONGO_DB, MONGO_URI } = useRuntimeConfig();
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  return client.db(MONGO_DB);
};
