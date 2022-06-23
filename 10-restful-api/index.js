const express = require("express")
const dotenv = require("dotenv").config();
const MongoUtil = require("./MongoUtil")
const MONGO_URI = process.env.MONGO_URI

const app = express();

//RESTFUL API expects all data sent to endpoint should be in JSON format
app.use(express.json())

async function main(){

    const db = await MongoUtil.connect(MONGO_URI, "tgc_food_sightings");
    console.log('connected to db')

    app.get("/", function(req,res){
        res.send("hello world")
    })

    //POST route cannot be tested via the browser
    app.post("/food_sightings", async function(req,res){
        //TO DO validation to be done here
        let description = req.body.description;
        let food = req.body.food;
        let datetime = req.body.datetime ? new Date(req.body.datetime) : new Date();

        let result = db.collection("sightings").insertOne({
            "description": description,
            "food": food,
            "datetime": datetime
        })
        res.status(201);
        res.send(result);
    })
}
main()




app.listen(3000, function(){
    console.log("server started")
})