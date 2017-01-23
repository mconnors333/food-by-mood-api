var express = require("express");
var parser  = require("body-parser");
var mongoose= require("./db/connection");
mongoose.Promise = global.Promise;


var app     = express();

var Food = mongoose.model("Food");

app.set("port", process.env.PORT || 3001);

app.use(parser.json({extended: true}));

app.get("/", function(req, res){
  res.render("foods");
});

app.get("/api/foods", function(req, res){
  Food.find({}).then(function(foods){
    res.json(foods);
  });
});

app.get("/api/foods/:title", function(req, res){
  Food.findOne({name: req.params.name}).then(function(food){
    res.json(food);
  });
});

app.post("/api/foods", function(req, res){
  Food.create(req.body).then(function(food){
    res.json(food);
  });
});

app.delete("/api/foods/:title", function(req, res){
  Food.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true });
  });
});

app.put("/api/candidates/:title", function(req, res){
  Food.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(food){
    res.json(food);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
