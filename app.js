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

app.get("/", function(req, res){
  // use the redis client to get the students
  client.lrange("students", 0, -1, function(err, students){
    res.render("index", {students: students});
  });
});

//post to create a todo
app.post("/create", function(req, res){
  console.log(req.body);
  // push req.body.pupils into the students list
  client.lpush("students",req.body.pupil);
  //do some creating
  res.redirect("/");
});

app.delete("/remove", function(req, res){
  client.del("students");
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is doing it and doing it and doing it well on port 3000");
});