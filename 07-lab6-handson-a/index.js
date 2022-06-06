const express = require("express");
const hbs = require("hbs");
const waXon = require("wax-on");

const app = express();
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false})); //enable forms

waXon.on(hbs.handlebars);
waXon.setLayoutPath("./views/layouts");

// 2. 
//display form
app.get("/calculate_bmi", function(req,res){
    res.render("index")
})
//retrieve input from form
app.post("/calculate_bmi", function(req,res){
    console.log(req.body);
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let unit = req.body.unit || "metric";
    let bmi = (weight/height**2).toFixed(2);
    if (unit == "imperial"){
        bmi = bmi * 703;
    }
    let bmiResult = '';
    if (bmi >= 18.5 && bmi<= 24.9){
        bmiResult = "healthy";
    } else {
        bmiResult = "unhealthy";
    }

    res.render("results", "bmiResult", {
        "bmi" : bmi,
        "bmiResult" : bmiResult
    });
})

// 3. 

app.listen(3000, function(){
    console.log("server started")
})