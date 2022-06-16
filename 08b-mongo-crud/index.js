const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const MongoUtil = require("./MongoUtil");

//dotenv
const dotenv = require("dotenv").config();
//check
//.env is the environment where the operating system stores its variables
// console.log(process.env);

const app = express();
app.set("view engine", "hbs"); //need to tell express we are using hbs file type as view engine
wax.on(hbs.handlebars); //set up tempate inheritance
wax.setLayoutPath("./views/layouts");

const MONGO_URI = process.env.MONGO_URI;

async function main (){

    const db = await MongoUtil.connect(MONGO_URI,"sample_airbnb");
    app.get("/test", async function(req,res){
        let data = await db.collection("listingsAndReviews").find({}).limit(10).toArray(); //convert result to an array of js objects with toArray()
        res.send(data);
    })

    app.get("/", function (req,res){
        res.render("hello.hbs")
    })
}

main();

app.listen(3000,function(){
    console.log("server started")
})