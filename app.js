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

mongoose.connect("mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

const postSchema = {
  name: String,
  email: String,
  question: String,
  answer: String,
  vote: Number
};

const questionSchema = {
  person: String,
  question: String
};

const reviewSchema = {
  vote: Number,
  index: Number
};

const Question = mongoose.model("Question", questionSchema);
const Post = mongoose.model("Post", postSchema);
const Review = mongoose.model("Review", reviewSchema);

app.get("/Community", function(req, res) {
  Post.find({}, function(err, posts) {
    Review.find({}, function(err, reviews){
      res.render("Community", {
        posts: posts,
        reviews: reviews
      });
    });
  });
});

app.get("/question", function(req, res) {
  Question.find({}, function(err, questions) {
    res.render("question", {
      questions: questions
    });
  });
});

app.get("/ask", function(req, res) {
  res.render("ask");
});

app.get("/post", function(req, res) {
  res.render("post");
});

app.post("/post", function(req, res) {
  const post = new Post({
    name: req.body.postName,
    email: req.body.postEmail,
    question: req.body.postQuestion,
    answer: req.body.postMessage,
  });
  let total;
  Review.find({}, function(err, reviews){
    total = reviews.length;
  });
  let review = new Review({
    vote: 0,
    index: total
  });
  post.save(function(err) {
    if (!err) {
      review.save(function(err){
        if(!err){
           res.redirect("/Community");
        }
      });
    }
  });
});

app.post("/vote", function(req, res){
  const vote = req.body.vote;
  const index = req.body.button;
});

app.post("/ask", function(req, res) {
  const question = new Question({
    person: req.body.questionName,
    question: req.body.questionMessage
  });
  question.save(function(err) {
    if (!err) {
      res.redirect("/question");
    }
  });
});

app.get("/question", function(req, res) {
  Question.find({}, function(err, questions) {
    res.render("question", {
      questions: questions
    });
  });
});

app.post("/answerNow", function(req, res){
  const ques = req.body.button;
  res.render("answerNow", {
    question: ques,
  });
});

app.get("/forum", function(req, res) {
  res.render("forum");
});

app.get("/", function(req, res) {
  res.render("home");
});
app.get("/about", function(req, res) {
    res.render("about");
});
app.get("/appointment", function(req, res) {
  res.render("appointment");
});
app.get("/contact", function(req, res) {
  res.render("Contact");
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
app.post("/searchHospital", function(req, res) {
  hospitalCity = req.body.city;
  hospitalName = req.body.hospitalName;

  let searchedHospital = [];
  for (let i = 0; i < hospital.length; i++) {
    if (hospital[i].city === hospitalCity) {
      searchedHospital.push(hospital[i]);
      break;
    }
  }

  for (let i = 0; i < hospital.length; i++) {
    if (hospital[i].name === hospitalName) {
      if (searchedHospital[0].name !== hospitalName) {
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
