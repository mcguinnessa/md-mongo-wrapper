const express = require("express");
const properties = require("../package.json");
const {MongoClient} = require('mongodb');

const db_tools = require('../mongo_tools');

const trafficRoute = express.Router();

async function getdata(){
    console.log("getData() called")

    const uri = await db_tools.get_url();
    console.log("URI:" + uri)
    const client = new MongoClient(uri);

    //const database = client.db("trafficDB");
    //const traffic_record = database.collection("traffic");
    const database = client.db(db_tools.DB_NAME);
    const traffic_record = database.collection(COLLECTION_NAME);

    const filter = {_id: 0, timestamp: 1 , moTraffic: 2};
    const docs = traffic_record.find().project(filter);

    var timeData = [];
    var moData = [];

    for await (const doc of docs) {
      console.log(doc);

      if ( typeof doc.moTraffic !== 'undefined' && doc.moTraffic ) {
        timeData.push(doc.timestamp)
        moData.push(doc.moTraffic)
      }
    }

    return {timedata: timeData, mo: moData};
}

trafficRoute.get("/", (req, res)=>{

    //res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');

    data_prom = getdata();

    time_data = [];
    mo_data = [];

    data_prom.then((data) => {
//      console.log("TIME");
//      console.log(data.timedata);
//      time_data = data.timedata;
//      console.log("MO");
//      console.log(data.mo);
      mo_data = data.modata;

      traffic = {
         timestamps: data.timedata,
         data: data.mo
      }

    res.json(traffic)
    });
});


module.exports = trafficRoute
