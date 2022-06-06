//we need to use express for this, we are going to include
//nodejs will look for express folder inside node_module, and locate index.js there. index.js will return an object (express functionality), to be stored in this const
const express = require("express"); 

// create an express application
let app = express();

//add routes
// a route is a url on our server
// first arg is path of url
// second argument is function that happens
app.get("/", function(req, res){
    res.send("hello world");
})

app.get("/about-us", function(req,res){
    res.send("About us");
})

app.get("/hello/:name", function(req,res){
    res.send("hi," + req.params.name);
})

app.get("/calculate", function(req,res){
    let a=req.query.a;
    let b=req.query.b;
    res.send("answer is: " + (a+b));
})

//start the server
// first argument is port, second is function
app.listen(3000, function(){
    console.log("server started");
})