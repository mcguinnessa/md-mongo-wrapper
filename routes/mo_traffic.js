const express = require("express");
////const properties = require("../package.json");
const {MongoClient} = require('mongodb');
const db_tools = require('../mongo_tools');

//import express from "express";
////import properties from "../package.json";
//import MongoClient from "mongodb";
//import db_tools from "../mongo_tools";

const trafficRoute = express.Router();


/********************************************
 * Really need to split this out, so there 
 * is only one connect call.
 *
 * Trying to streamline the upstream call
 * causes errors when there are multiple connect
 * calls
 *
 * Give the error:
 *    topology.close({ force }, error => {
 *
 *
 */
async function getData(){
    console.log("getData() called")

    const uri = await db_tools.get_url();
    console.log("URI:" + uri)
    const client = new MongoClient(uri);

    var timeData = [];
    var moData = [];

    try { 
      const database = client.db(db_tools.DB_NAME);
      const full_collection = database.collection(db_tools.COLLECTION_NAME);
      //console.log("Full Collection");
      //console.log(full_collection);

      const filter = {_id: 0, timestamp: 1 , moTraffic: 2};
      const docs = full_collection.find().project(filter);
      //console.log("docs");
      //console.log(docs);


      for await (const doc of docs) {
        console.log(doc);

        if ( typeof doc.moTraffic !== 'undefined' && doc.moTraffic ) {
          timeData.push(doc.timestamp)
          moData.push(doc.moTraffic)
        }
      }
    } catch {
      console.log("Timed out getting data from MongoDB");
    } finally {
      client.close();
    }

    return {timedata: timeData, mo: moData};
}

//trafficRoute.get("/", (req, res)=>{
//
//    res.setHeader('Access-Control-Allow-Origin','*');
//
//    data_prom = getdata();
//
//    data_prom.then((data) => {
//
//      traffic = {
//         timestamps: data.timedata,
//         data: data.mo
//      }
//
//    res.json(traffic)
//    });
//});

function simpleFunction() {
  return "success";
};

//function complexFunction() {
//  return simpleFunction();
//};


function getHandler(req, res) {
    console.log("getHandler() called")

    res.setHeader('Access-Control-Allow-Origin','*');

    data_prom = getData();

    data_prom.then((data) => {

      traffic = {
         timestamps: data.timedata,
         data: data.mo
      }

    res.json(traffic)
    });
};


trafficRoute.get("/", getHandler);


//module.exports = {trafficRoute, simpleFunction, getData}
module.exports = trafficRoute
//export {
//	trafficRoute, simpleFunction, complexFunction, getData}
//export default trafficRoute



/*
{"timestamps":["2023-06-07T20:33:41.909Z","2023-06-07T21:33:41.909Z","2023-06-07T22:33:41.909Z","2023-06-07T23:33:41.909Z","2023-06-08T00:33:41.909Z","2023-06-08T01:33:41.909Z","2023-06-08T02:33:41.909Z","2023-06-08T03:33:41.909Z","2023-06-08T04:33:41.909Z","2023-06-08T05:33:41.909Z","2023-06-08T06:33:41.909Z","2023-06-08T07:33:41.909Z","2023-06-08T08:33:41.909Z","2023-06-08T09:33:41.909Z","2023-06-08T10:33:41.909Z","2023-06-08T11:33:41.909Z","2023-06-08T12:33:41.909Z","2023-06-08T13:33:41.909Z","2023-06-08T14:33:41.909Z","2023-06-08T15:33:41.909Z","2023-06-08T16:33:41.909Z","2023-06-08T17:33:41.909Z","2023-06-08T18:33:41.909Z","2023-06-08T19:33:41.909Z","2023-06-09T16:53:53.770Z","2023-06-09T17:53:53.770Z","2023-06-09T18:53:53.770Z","2023-06-09T19:53:53.770Z","2023-06-09T20:53:53.770Z","2023-06-09T21:53:53.770Z","2023-06-09T22:53:53.770Z","2023-06-09T23:53:53.770Z","2023-06-10T00:53:53.770Z","2023-06-10T01:53:53.770Z","2023-06-10T02:53:53.770Z","2023-06-10T03:53:53.770Z","2023-06-10T04:53:53.770Z","2023-06-10T05:53:53.770Z","2023-06-10T06:53:53.770Z","2023-06-10T07:53:53.770Z","2023-06-10T08:53:53.770Z","2023-06-10T09:53:53.770Z","2023-06-10T10:53:53.770Z","2023-06-10T11:53:53.770Z","2023-06-10T12:53:53.770Z","2023-06-10T13:53:53.770Z","2023-06-10T14:53:53.770Z","2023-06-10T15:53:53.770Z","2023-06-09T16:54:53.813Z","2023-06-09T17:54:53.813Z","2023-06-09T18:54:53.813Z","2023-06-09T19:54:53.813Z","2023-06-09T20:54:53.813Z","2023-06-09T21:54:53.813Z","2023-06-09T22:54:53.813Z","2023-06-09T23:54:53.813Z","2023-06-10T00:54:53.813Z","2023-06-10T01:54:53.813Z","2023-06-10T02:54:53.813Z","2023-06-10T03:54:53.813Z","2023-06-10T04:54:53.813Z","2023-06-10T05:54:53.813Z","2023-06-10T06:54:53.813Z","2023-06-10T07:54:53.813Z","2023-06-10T08:54:53.813Z","2023-06-10T09:54:53.813Z","2023-06-10T10:54:53.813Z","2023-06-10T11:54:53.813Z","2023-06-10T12:54:53.813Z","2023-06-10T13:54:53.813Z","2023-06-10T14:54:53.813Z","2023-06-10T15:54:53.813Z","2023-06-09T16:55:24.076Z","2023-06-09T17:55:24.076Z","2023-06-09T18:55:24.076Z","2023-06-09T19:55:24.076Z","2023-06-09T20:55:24.076Z","2023-06-09T21:55:24.076Z","2023-06-09T22:55:24.076Z","2023-06-09T23:55:24.076Z","2023-06-10T00:55:24.076Z","2023-06-10T01:55:24.076Z","2023-06-10T02:55:24.076Z","2023-06-10T03:55:24.076Z","2023-06-10T04:55:24.076Z","2023-06-10T05:55:24.076Z","2023-06-10T06:55:24.076Z","2023-06-10T07:55:24.076Z","2023-06-10T08:55:24.076Z","2023-06-10T09:55:24.076Z","2023-06-10T10:55:24.076Z","2023-06-10T11:55:24.076Z","2023-06-10T12:55:24.076Z","2023-06-10T13:55:24.076Z","2023-06-10T14:55:24.076Z","2023-06-10T15:55:24.076Z","2023-06-09T16:56:05.968Z","2023-06-09T17:56:05.968Z","2023-06-09T18:56:05.968Z","2023-06-09T19:56:05.968Z","2023-06-09T20:56:05.968Z","2023-06-09T21:56:05.968Z","2023-06-09T22:56:05.968Z","2023-06-09T23:56:05.968Z","2023-06-10T00:56:05.968Z","2023-06-10T01:56:05.968Z","2023-06-10T02:56:05.968Z","2023-06-10T03:56:05.968Z","2023-06-10T04:56:05.968Z","2023-06-10T05:56:05.968Z","2023-06-10T06:56:05.968Z","2023-06-10T07:56:05.968Z","2023-06-10T08:56:05.968Z","2023-06-10T09:56:05.968Z","2023-06-10T10:56:05.968Z","2023-06-10T11:56:05.968Z","2023-06-10T12:56:05.968Z","2023-06-10T13:56:05.968Z","2023-06-10T14:56:05.968Z","2023-06-10T15:56:05.968Z"],"data":[4697,2169,1122,515,5318,5438,9054,3283,5513,3390,7151,1822,512,331,3637,3878,3081,1160,9803,2239,3946,9922,4081,1785,7491,2759,1851,2397,8424,6174,1391,3236,8029,8805,6468,2788,9948,197,8258,3414,6826,4570,7628,9103,3359,8286,6905,7712,1876,1143,7205,7616,6654,572,8867,1259,4762,3608,8901,1741,7455,3599,3547,9697,2252,3527,7542,3640,2841,5192,8095,4914,4090,5517,3641,2909,5535,3886,6683,5745,287,9493,7948,3399,5950,2328,9601,3203,5411,6569,9453,6543,6931,9115,492,8745,9410,457,9665,1688,8025,7484,8770,7108,6519,5812,1681,8353,883,5510,9877,1409,3374,6303,2214,8751,8577,7877,8216,7197]} */
