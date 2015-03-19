var express = require("express"),
app = express(),
  redis = require("redis"),
  client = redis.createClient(),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser");

// NEED ME SOME MIDDLEWARE!

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//If I want to include css/js/imgs
app.use(express.static(__dirname + '/public'));