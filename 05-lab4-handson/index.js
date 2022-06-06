const express = require("express");
const hbs = require("hbs");
const waxOn = require("wax-on");


const app = express();
app.set("view engine", "hbs"); //set up views folder
app.use(express.static("public")); //set up public folder
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath("./views/layouts"); //set up layouts folder in views

app.get("/", function(req,res){
    res.render("index")
})

app.get("/submit", function(req,res){
    res.render("submit")
})

app.get("/admin", function(req,res){
    res.render("admin")
})

app.listen(3000, function(){
    console.log("server started");
})