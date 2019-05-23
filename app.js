const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


//connect to database and create collection if it does not exist
mongoose.connect("mongodb://localhost/movie_reel", {useNewUrlParser: true }, function(err, db){
  if(err){
    console.log(err);
  }
  else{
    db.createCollection("titles", {strict: true}, function(err, titles){
      if (err){
        console.log("Database up to date...");
      }
      else{
        var genTitles = [
          {title: "Get Out", genre: "Horror"},
          {title: "The Witch", genre: "Horror"},
          {title: "The Conjuring", genre: "Horror"},
          {title: "Insidious", genre: "Horror"},
          {title: "The Descent", genre: "Horror"},
          {title: "Saw", genre: "Horror"},
          {title: "The Ring", genre: "Horror"},
          {title: "Hereditary", genre: "Horror"},
          {title: "The Cabin in the Woods", genre: "Horror"},
          {title: "The Grudge", genre: "Horror"},
          {title: "Bone Tomahawk", genre: "Horror"},
          {title: "It", genre: "Horror"},
          {title: "21 Jump Street", genre: "Comedy"},
          {title: "The Hangover", genre: "Comedy"},
          {title: "Beerfest", genre: "Comedy"},
          {title: "Step Brothers", genre: "Comedy"},
          {title: "The Other Guys", genre: "Comedy"},
          {title: "Superbad", genre: "Comedy"},
          {title: "Old School", genre: "Comedy"},
          {title: "Easy A", genre: "Comedy"},
          {title: "Goon", genre: "Comedy"},
          {title: "22 Jump Street", genre: "Comedy"},
          {title: "Grandma's Boy", genre: "Comedy"},
          {title: "Game Night", genre: "Comedy"},
          {title: "Titanic", genre: "Romance"},
          {title: "Drinking Buddies", genre:"Romance"},
          {title: "About Time", genre:"Romance"},
          {title: "500 Days of Summer", genre:"Romance"},
          {title: "The Notebook", genre:"Romance"},
          {title: "The Princess Bride", genre:"Romance"},
          {title: "Her", genre:"Romance"},
          {title: "Love Actually", genre:"Romance"},
          {title: "The Lobster", genre:"Romance"},
          {title: "Vicky Cristina Barcelona", genre:"Romance"},
          {title: "Crazy, Stupid, Love.", genre:"Romance"},
          {title: "Up in the Air", genre:"Romance"},
          {title: "Star Wars: Episode IV - A New Hope", genre:"Fantasy"},
          {title: "Star Wars: Episode V - The Empire Strikes Back", genre:"Fantasy"},
          {title: "Star Wars: Episode III - Revenge of the Sith", genre:"Fantasy"},
          {title: "Star Wars: The Force Awakens", genre:"Fantasy"},
          {title: "Serenity", genre:"Fantasy"},
          {title: "The Lord of the Rings: The Fellowship of the Ring", genre:"Fantasy"},
          {title: "The Lord of the Rings: The Two Towers", genre:"Fantasy"},
          {title: "Avengers", genre:"Fantasy"},
          {title: "Maleficent", genre:"Fantasy"},
          {title: "Pan's Labyrinth", genre:"Fantasy"},
          {title: "Alice in Wonderland", genre:"Fantasy"},
          {title: "Constantine", genre:"Fantasy"}
        ];
        titles.insertMany(genTitles, function(err, res){
          if (err){
            console.log(err);
          }
          else{
            console.log("Initial titles added to database");
          }
        })
      }
    });
  }
  db.createCollection("upcomings", {strict: true}, function(err, upcoming){
    if (err){
      console.log("New releases up to date...")
      }
    else{
      var genNewRelease = [
        {title: "Avengers Endgame", src:"https://movieposterhd.com/wp-content/uploads/2019/03/Avengers-Endgame-2019-Poster-Wallpaper.jpg"},
        {title: "War Craft", src:"https://stmed.net/sites/default/files/movie-wallpapers-29755-8932149.jpg"},
        {title: "Jurassic World", src:"https://stmed.net/sites/default/files/jurassic-world-wallpapers-29670-3451940.jpg"},
        {title: "Hell Boy", src:"https://movieposterhd.com/wp-content/uploads/2019/02/Hellboy-2019-Full-Movie-Wallpaper.jpg"},
        {title: "Interstellar", src:"https://cdn-images-1.medium.com/max/2400/1*vsXnKkJRKxsISJH4lNGlag.jpeg"},
        {title: "Enemy", src:"https://images.alphacoders.com/547/thumb-1920-547152.jpg"}
      ];
      upcoming.insertMany(genNewRelease, function(err, res){
        if (err){
          console.log(err);
        }
        else{
          console.log("New Releases added");
        }
      })
    }
    });
});




let db = mongoose.connection;


//bring in titles model
let Title = require("./models/titles");
let Upcoming = require("./models/upcomings");

//initialize app.js
const app = express();

//load static files
app.use(express.static(path.join(__dirname, 'public')));

//load home page
app.get("/", function(req, res){
  Title.find({}, function(err, result){
    res.sendFile(__dirname + "/views/home.html");
  })
})

//request from main.js to query database and build movie reels
app.get("/load", function(req, res){
  Title.find({}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      res.send(data);
    }
  })
})


//request from main.js to grab new release genTitles
app.get("/loadNew", function(req, res){
  Upcoming.find({}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      res.send(data);
    }
  })
})

app.get("/temp", function(req, res){
  res.sendFile(__dirname + "/views/temp.html");
})

app.listen(3000, function(){
  console.log("Serever listening on port 3000");
})
