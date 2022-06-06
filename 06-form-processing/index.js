//1. set up express, hbs, waxon
const express = require("express");
const hbs = require("hbs");
const waXon = require ("wax-on");

const app = express();
app.set("view engine", "hbs");
app.use(express.static("public"));
waXon.on(hbs.handlebars);
waXon.setLayoutPath("./views/layouts");

//**IMPORTANT */
// set up express to process form
app.use(express.urlencoded({
    "extended" : false
}))


//2. routes
app.get("/", function(req,res){
    res.send("hello world");
})

app.get("/add-food", function(req,res){
    res.render("add");
})

app.post("/add-food", function(req,res){
    console.log(req.body);
    let fruit = req.body.fruitName;
    let calories = req.body.calories;
    let meal = req.body.meal;

    // if 2 or more checkboxes, save as array
    // if only 1, turn into arrary
    // if no checked, turn into empty array
    // let tags = req.body.tags;
    // if (!tags){
    //     tags = [];
    // } else if (!Array.isArray(tags)){
    //         tags = [tags];
    //     }
    tags = tags || [];
    tags = Array.isArray(tags) ? tags : [tags];

    console.log("tags: ", tags)
    res.send("form received");
})

//3. start server
app.listen(3000, function(){
    console.log("server started")
})