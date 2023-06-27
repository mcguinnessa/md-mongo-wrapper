const express = require("express");
//const properties = require("../package.json");
const {MongoClient} = require('mongodb');
const db_tools = require('../mongo_tools');
const db = require('../db');

const trafficRoute = express.Router();

async function getdata(){
    console.log("memusage getData() called")

//    const uri = await db_tools.get_url();
//    console.log("URI:" + uri)
//    const client = new MongoClient(uri);
    var timeData = [];
    var memUsageData = [];

    try { 
      const client = db.getDb();
      //const database = client.db(db_tools.DB_NAME);
      const full_collection = client.collection(db_tools.COLLECTION_NAME);

      const filter = {_id: 0, timestamp: 1 , memUsage: 2};
      const docs = full_collection.find().project(filter);

      for await (const doc of docs) {
        //console.log(doc);

        if ( typeof doc.memUsage !== 'undefined' && doc.memUsage ) {
          timeData.push(doc.timestamp)
          memUsageData.push(doc.memUsage)
	  console.log("Time:" + doc.timestamp + " Mem:" + doc.memUsage)
        }
      }
    } catch (err){     
      //console.log("Timed out getting data from MongoDB");
      console.log("Timed out getting data from MongoDB/memusage:"+err);
    } finally {
//      client.close();
    }

    return {timedata: timeData, memusage: memUsageData};
}

trafficRoute.get("/", (req, res)=>{

    res.setHeader('Access-Control-Allow-Origin','*');

    data_prom = getdata();

    data_prom.then((data) => {

      traffic = {
         timestamps: data.timedata,
         data: data.memusage
      }

    res.json(traffic)
    });
});


module.exports = trafficRoute

