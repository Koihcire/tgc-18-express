//npm init, yarn add express, yarn add dotenv, yarn add mongo
const express = require("express")
const dotenv = require("dotenv").config();
const MongoUtil = require("./MongoUtil")
const MONGO_URI = process.env.MONGO_URI
const jwt = require ("jsonwebtoken")

const app = express();

//RESTFUL API expects all data sent to endpoint should be in JSON format
app.use(express.json())

async function main(){
    //initialise database
    const db = await MongoUtil.connect(MONGO_URI, "tgc_school");
    console.log('connected to db');

    app.get("/", function(req,res){
        res.send("hello students")
    })

    //POST route cannot be tested via the browser
    app.post("/enrol", async function(req,res){
        //TO DO validation to be done here

        let result = db.collection("students").insertOne({
            "name": req.body.name,
            "age": req.body.age,
            "email": req.body.email,
            "password": req.body.password,
            "classes": req.body.classes
        })
        res.status(201);
        res.send(result);
    })
}
main();

app.listen(3000, function(){
    console.log("server started")
})