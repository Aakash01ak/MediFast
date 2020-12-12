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


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/userDB", {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.get("/", function(req, res){
  res.render("home");
})


app.listen(3000, function() {
  console.log("Server has started successfully");
});
