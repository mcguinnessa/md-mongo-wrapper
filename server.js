//const express = require("express");

const app = require('./app.js')


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

app.listen(server_port, ()=> {
    console.log(`Server running at ${server_port}`)
})

