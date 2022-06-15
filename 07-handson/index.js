const { default: axios } = require('axios');
const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');


let app = express(); //create the express application
app.set('view engine', 'hbs'); // inform express that we are using hbs as the view engine
waxOn.on(hbs.handlebars); // enable wax-on for handlebars (for template inheritance)
waxOn.setLayoutPath('./views/layouts') // inform wax-on where to find the layouts
app.use(express.static("public"));

app.use(express.urlencoded({
    'extended':false // for processing HTML forms usually it's false because
                     // HTML forms are usually quite simple
}))

// routes
const BASE_API_URL = "https://ckx-movies-api.herokuapp.com/";

//display movies data
app.get('/movies', async function(req,res){
    let response = await axios.get(BASE_API_URL + "movies");
    res.render("movies" , {
        "movies" : response.data
    })
})

//add a new entry
app.get("/movie/create", function(req,res){
    res.render("create");
})
app.post("/movie/create", async function(req,res){
    let data = {
        "title" : req.body.title,
        "plot" : req.body.plot
    }
    await axios.post(BASE_API_URL + "movie/create" , data);
    res.redirect("/movies")
})

//update an existing entry
app.get("/movie/update/:movie_id", async function(req,res){
    let response = await axios.get(BASE_API_URL + "movie/" + req.params.movie_id);
    let movie = response.data;
    res.render("update_movie", {
        "movie" : movie
    })
})
app.post("/movie/update/:movie_id", async function(req,res){
    let movie = {
        "title" : req.body.title,
        "plot" : req.body.plot
    }
    await axios.patch(BASE_API_URL + "movie/" + req.params.movie_id, movie);
    res.redirect("/movies");
})

//delete a movie entry
app.get("/movie/delete/:movie_id", async function(req,res){
    let response = await axios.get(BASE_API_URL + "movie/" + req.params.movie_id);
    let movie = response.data;
    res.render("delete_movie", {
        "movie" : movie
    })
})
app.post("/movie/delete/:movie_id", async function(req,res){
    await axios.delete(BASE_API_URL + "movie/" + req.params.movie_id);
    res.redirect("/movies");
})

app.listen(3000, function(){
    console.log("server started");
})

