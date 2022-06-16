const { application } = require("express");
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;

//dotenv
const dotenv = require("dotenv").config();
//check
//.env is the environment where the operating system stores its variables
// console.log(process.env);

const app = express();
app.set("view engine", "hbs"); //need to tell express we are using hbs file type as view engine
wax.on(hbs.handlebars); //set up tempate inheritance
wax.setLayoutPath("./views/layouts");

app.use(express.static("public"));

app.use(express.urlencoded({
    extended:false
}))

const MONGO_URI = process.env.MONGO_URI;

async function main (){

    const db = await MongoUtil.connect(MONGO_URI,"tgc18-pets");
    // app.get("/test", async function(req,res){
    //     let data = await db.collection("listingsAndReviews").find({}).limit(10).toArray(); //convert result to an array of js objects with toArray()
    //     res.send(data);
    // })
    app.get("/", async function(req,res){
        const allPetRecords = await db.collection("pet_records").find({}).toArray();

        res.render("all-pets",{
            "allPets" : allPetRecords
        })
    })
    //create form to add pet
    app.get("/add-pet", function(req,res){
        res.render("add-pet");
    })

    app.post("/add-pet", async function(req,res){
        let name = req.body.name;
        let breed = req.body.breed;
        let description = req.body.description;
        let age = req.body.age;
        let p = req.body.problems;
        let problems = p.split(",");
        let tags = [];
        if (Array.isArray(req.body.tags)){
            tags = req.body.tags;
        } else if (req.body.tags){
            tags = [req.body.tags];
        }

        let petDocument = {
            "name": name,
            "breed": breed,
            "description": description,
            "age": age,
            "problems": problems,
            "tags": tags
        };

        await db.collection("pet_records").insertOne(petDocument);
        res.redirect("/")
    })

    //create page to get specific pet
    app.get("/get-pet/:pet_id", async function(req,res){
        let petId = req.params.pet_id;

        let response = await db.collection("pet_records").find({
            "_id": ObjectId(petId)
        }).toArray();
        
        res.render("get-pet",{
            "record" : response
        })
    })
}
main();

app.listen(3000,function(){
    console.log("server started")
})