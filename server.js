const express = require("express");
const bodyParser = require("body-parser")

const moTrafficRouter = require("./routes/mo_traffic");

//const PORT = 3000;
const HOST_NAME = "localhost";

const app = express();

const server_port = process.env.SERVER_PORT;
console.log(process.env);
console.log(server_port);

app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/motraffic", moTrafficRouter);

app.listen(server_port, ()=> {
    console.log(`Server running at ${server_port}`)
})


