const express = require("express");
const bodyParser = require("body-parser")
//import express from "express";
//import * as bodyParser from "express";


const app = express();

app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

const moTrafficRouter = require("./routes/mo_traffic");
const mtTrafficRouter = require("./routes/mt_traffic");
const cpuUsageRouter = require("./routes/cpu_usage");
const cpuTempRouter = require("./routes/cpu_temp");
const memUsageRouter = require("./routes/mem_usage");
const diskUsageRouter = require("./routes/disk_usage");
//import moTrafficRouter from "./routes/mo_traffic";
//import mtTrafficRouter from "./routes/mt_traffic";
//import cpuUsageRouter from "./routes/cpu_usage";
//import cpuTempRouter from "./routes/cpu_temp";
//import memUsageRouter from "./routes/mem_usage";
//import diskUsageRouter from "./routes/disk_usage";




app.use("/motraffic", moTrafficRouter);
app.use("/mttraffic", mtTrafficRouter);
app.use("/cpuusage", cpuUsageRouter);
app.use("/cputemp", cpuTempRouter);
app.use("/memusage", memUsageRouter);
app.use("/diskusage", diskUsageRouter);

//export default app
module.exports = app

