//const express = require("express");

const app = require('./app.js')
//const getDb = require("./db").getDb;
const db = require("./db");
const tools = require("./mongo_tools");


//const bodyParser = require("body-parser")

//const moTrafficRouter = require("./routes/mo_traffic");
//const mtTrafficRouter = require("./routes/mt_traffic");
//const cpuUsageRouter = require("./routes/cpu_usage");
//const cpuTempRouter = require("./routes/cpu_temp");
//const memUsageRouter = require("./routes/mem_usage");
//const diskUsageRouter = require("./routes/disk_usage");

//const PORT = 3000;
const HOST_NAME = "localhost";

//const app = express();

const server_port = process.env.SERVER_PORT;
console.log(process.env);
console.log(server_port);

//app.use(express.static("client"));
//app.use(bodyParser.urlencoded({extended: true}));

//app.use("/motraffic", moTrafficRouter);
//app.use("/mttraffic", mtTrafficRouter);
//app.use("/cpuusage", cpuUsageRouter);
//app.use("/cputemp", cpuTempRouter);
//app.use("/memusage", memUsageRouter);
//app.use("/diskusage", diskUsageRouter);


//initDb(function (err) {
//  app.listen(server_port, function (err) {
//    if (err) {
//      throw err; //
//    }
//    console.log("API Up and running on port " + port);
//  });
//});

//var mongoUtil = require( 'mongoUtil' );
//


uri = tools.get_url();

try {

db.connectToServer( uri, tools.DB_NAME, function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here
  app.listen(server_port, ()=> {
    console.log(`Server running at ${server_port}`)
  })
} );

} finally {
  db.closeDb();
}
//});

//app.listen(server_port, ()=> {
//    console.log(`Server running at ${server_port}`)
//})

