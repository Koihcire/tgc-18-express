const express = require("express");
const hbs = require("hbs");
const waXon = require("wax-on");
const axios = require("axios"); //for access to resful api

const app = express();
app.set("view engine", "hbs");
app.use(express.static("public"));
waXon.on(hbs.handlebars);
waXon.setLayoutPath("./views/layouts");
app.use(express.urlencoded({extended:false}));


const BASE_API_URL = "https://ckx-restful-api.herokuapp.com/";
// routes
app.get("/", async function(req,res){
    let response = await axios.get(BASE_API_URL + "sightings");
    res.render("sightings", {
        "foodSightings" : response.data
    })
})

app.get("/food_sighting/create", function(req,res){
    res.render("food_form");
})

app.post("/food_sighting/create", async function(req,res){
    let data = {
        "description" : req.body.description,
        "food" : req.body.food.split(","),
        "datetime" : req.body.datetime
    }
    await axios.post(BASE_API_URL + "sighting", data);
    res.redirect("/");
})

//open port
app.listen(3000,function(){
    console.log("server started")
})