"use strict";

require('dotenv').config();

var express = require("express");

var bodyParser = require("body-parser");

var ejs = require("ejs");

var mongoose = require("mongoose");

var session = require("express-session");

var passport = require("passport");

var passportLocalMongoose = require("passport-local-mongoose");

var GoogleStrategy = require('passport-google-oauth20').Strategy;

var findOrCreate = require('mongoose-findorcreate');

var request = require("request");

var app = express();
app.use(express["static"]("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect("mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/LogIn", function (req, res) {
  res.render("Login");
});
app.get("/SignIn", function (req, res) {
  res.render("SignIn");
});
var hospital = [];
var hospital_array = [];
request("http://www.communitybenefitinsight.org/api/get_hospitals.php?state=NC", function (error, response, body) {
  hospital = JSON.parse(body);
  hospital.slice(0, 100);
});
app.get("/hospital", function (req, res) {
  res.render("hospital", {
    hospital_data: hospital
  });
});
app.listen(3000, function () {
  console.log("Server has started successfully");
});