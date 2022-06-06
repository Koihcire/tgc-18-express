const express = require("express");
const hbs = require("hbs");
const waXon = require("wax-on");
const axios = require("axios"); //for access to resful api

const app = express();
app.set("view engine", "hbs");
// app.use(express.static("public"));
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

//edit post
app.get("/food_sighting/edit/:food_sighting_id", async function(req,res){
    try{
    let foodSightingId = req.params.food_sighting_id;
    let response = await axios.get(BASE_API_URL + "sighting/" + foodSightingId);
    let foodSighting = response.data;
    res.render("edit_food_form", {
        "description" : foodSighting.description,
        "food" : foodSighting.food,
        "datetime" : foodSighting.datetime.slice(0, -1)
    });
    } catch(e){
        console.log(e);
    }
})
app.post("/food_sighting/edit/:food_sighting_id", async function(req,res){
    let data = {
        "description" : req.body.description,
        "food" : req.body.food.split(","),
        "datetime" : req.body.datetime
    }
    let foodSightingId = req.params.food_sighting_id;
    await axios.put(BASE_API_URL + "sighting/" + foodSightingId , data)

    res.redirect("/");
})


//open port
app.listen(3000,function(){
    console.log("server started")
})