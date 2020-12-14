require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const request = require("request");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect("mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
app.get("/", function(req, res) {
    res.render("home");
});
app.get("/LogIn", function(req, res) {
    res.render("Login");
});
app.get("/SignIn", function(req, res) {
    res.render("SignIn");
});
app.get("/Community", function(req, res) {
    res.render("Community");
});


let hospital = [];
let hospital_array = [];
request("http://www.communitybenefitinsight.org/api/get_hospitals.php?state=NC", function(error, response, body) {
    hospital = JSON.parse(body);
    hospital.slice(0, 100);
});

app.get("/hospital", function(req, res) {
    res.render("hospital", {
        hospital_data: hospital,
    });
});

let hospitalCity;
let hospitalName;
app.post("/searchHospital", function(req, res){
  hospitalCity = req.body.city;
  hospitalName = req.body.hospitalName;

  let searchedHospital = [];
  for(let i=0;i<hospital.length;i++){
    if(hospital[i].city === hospitalCity){
      searchedHospital.push(hospital[i]);
      break;
    }
  }

  for(let i=0;i<hospital.length;i++){
    if(hospital[i].name === hospitalName){
      if(searchedHospital[0].name !== hospitalName){
        searchedHospital.push(hospital[i]);
      }
      break;
    }
  }

  res.render("hospital", {
    hospital_data: searchedHospital,
  });

});


app.listen(3000, function() {
    console.log("Server has started successfully");
});
