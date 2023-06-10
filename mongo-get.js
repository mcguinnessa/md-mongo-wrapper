const db_tools = require('./mongo_tools');

const {MongoClient} = require('mongodb');

const day_ms = 24 * 60 * 60 * 1000;
const hour_ms = 60 * 60 * 1000;

async function run(){

  const uri = await db_tools.get_url();
  console.log(uri);
  const client = new MongoClient(uri);

  try {
    const database = client.db(db_tools.DB_NAME);
    const traffic_record = database.collection(db_tools.COLLECTION_NAME);

    const docs = traffic_record.find();

    //console.log(`A collection was retrieved: ${docs.insertedId}`);

    for await (const doc of docs) {
      console.log(doc);
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);

