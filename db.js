const assert = require("assert");
//const client = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");
const db_tools = require('./mongo_tools');



var _db;
var client;

module.exports = {

  connectToServer: function(url, aDbName, callback ) {
    console.log("Connecting to:" + url);
    client = new MongoClient(url);
    client.connect();
    //MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
    _db  = client.db(aDbName);
    //console.log("Connected");
    return callback("connected");
    //} );
  },

  getDb: function() {
    return _db;
  },

  closeDb: function(){
    client.close();
  }

};


//let _db;
//
//async function initDb(callback) {
//  if (_db) {
//
//    console.warn("Trying to init DB again!");
//    return callback(null, _db);
//  }
//
//  const uri = db_tools.get_url();
//  console.log("URI:" + uri)
//  const client = new MongoClient(uri);
//  //client.connect(config.db.connectionString, config.db.connectionOptions, connected);
//  //client.connect(uri, config.db.connectionOptions, connected);
//  _db = client.db(db_tools.DB_NAME);
//
////  function connected(err, db) {
////    if (err) {
////      return callback(err);
////    }
//    console.log("DB initialized - connected to: " + config.db.connectionString.split("@")[1]);
////      _db = db;
////      return callback(null, _db);
////    }
//}
//
//function getDb() {
//  assert.ok(_db, "Db has not been initialized. Please called init first.");
//  return _db;
//}
//
//
//m//odule.exports = {
//    getDb,
//    initDb
//};
