var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var register = require("./registerPage");

app.get("/", function (req, res) {
  res.send("server is running");
});


app.post("/userRegistartion", register.registerdPatients);
app.get("/sendSMS", register.sendSMS);


var http = require("http");

http.createServer(function (req, res) {
  res.writeHead("200", { "context-type": "text-plain" });
  res.sendDate("its running");
});
app.listen(4000);

// http://localhost:4000/userRegistartion

// http://localhost:3002/user
