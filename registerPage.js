var mongoose = require("mongoose");
var express = require("express");
let app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var nodemailer = require("nodemailer");
var twilio = require("twilio");

var SID = "AC9b31a76dc304c2f9a37086b37c90367b";
var AUTHTOKEN = "08cfeae6b97a765a77a87dff9473858d";

var tranporter = nodemailer.createTransport({
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: "ugandharkurra1996@gmail.com",
    pass: "lhzgcxjmidmlppnd",
  },
});

var mailOptions = {
  from: "ugandharkurra1996@gmail.com",
  to: "",
  subject: "registartion mail",
  html: "",
};

var Schema = mongoose.Schema;

var detailsdb = "mongodb://localhost:27017/newregister";

mongoose
  .connect(detailsdb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("new regitser db connceted");
  })
  .catch(() => {
    console.log("error occured while connecting");
  });

var regitserSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  mobileNumber: Number,
});

var PatientDetails = mongoose.model("newPtients", regitserSchema);

exports.registerdPatients = async function (req, res) {
  console.log("HGHGHG", req);
  if (
    !req.body.fname ||
    !req.body.lname ||
    !req.body.email ||
    !req.body.mobileNumber
  ) {
    res.status(206).send({
      message: "please provide valid input",
      status: "failure",
    });
  } else {
    var myData = new PatientDetails(req.body);
    myData
      .save()
      .then((item) => {
        sendEmail(req.body.email);
        res.status(200).send("successfully registered");
      })
      .catch((err) => {
        res.status(400).send("unble to save data base");
      });
  }
};

const sendEmail = async function (email) {
  debugger;
  mailOptions.to = email;
  console.log("first", mailOptions);
  // const salt =  await bcrypt.genSalt(10);
  // const hashedemail = await  bcrypt.hash(email, salt);
  // console.log("second", hashedemail)
  mailOptions.html =
    "<p> Hi, Click on this link to verify your email Id <a style='color:red;' href=http://localhost:3000/verifyEmail/" +
    email +
    ">click this to verify</a> </p>";
  tranporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

exports.sendSMS = async function (req, res) {
  var twilio = require("twilio")(SID, AUTHTOKEN);

  twilio.messages
    .create({
      from: "+19854411301",
      to: "+918919662466",
      body: "this is a testing message",
    })
    .then(function (res) {
      console.log("message has sent!");
    })
    .catch(function (err) {
      console.log(err);
    });
};
