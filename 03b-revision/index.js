const express = require("express");

const hbs = require("hbs");
//set up app
const app = express();
//set up express to use hbs
app.set("view engine", "hbs");

app.use(express.static("public"));

//routes are defined before starting the server
//first argument is always req
//if no res.send, browser will return error waiting for the response
app.get("/", function(req,res){
    // res.send("hello world");
    res.render("index");
})

app.get("/hello/:name", function(req,res){
    let name = req.params.name;
    res.render("hello", {name});
})

app.listen(3000, function(){
    console.log("server started");
})