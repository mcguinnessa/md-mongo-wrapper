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

    var now = new Date();
    var now_ms = now.getTime()
    var yesterday = new Date(now_ms - day_ms);

    var date_record = yesterday;
    while (date_record < now){

      var mo_traffic = Math.floor(Math.random() * 10000);
      var mt_traffic = Math.floor(Math.random() * 10000);

      const doc = {
        timestamp: date_record,
        "moTraffic": mo_traffic,
        "mtTraffic": mt_traffic,
      }  
      const result = await traffic_record.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);

      date_record = new Date(date_record.getTime() + hour_ms);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
