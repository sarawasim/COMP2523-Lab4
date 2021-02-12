/*
 Authors:
 Your name and student #: Sara Wasim A00818198
 Your Partner's Name and student #: Johnny Kung
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs')
const path = require('path')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  console.log(req.body)
  const movies = req.body.movies.split(',')
  console.log(movies)
  res.render(__dirname + "/views/pages/index", { movies })
});

app.get("/myListQueryString", (req, res) => {
  const query = req.query
  const movies = Object.values(query)
  console.log(movies)
  res.render(__dirname + "/views/pages/index", { movies })
});

app.get("/search/:movieName", (req, res) => {
  console.log(req.params)
  const keyword = req.params.movieName
  console.log(__dirname)
  fs.readFile(`${__dirname}/movieDescriptions.txt`, 'utf8', function (err, data) {
    if (err) console.log(err)
    console.log(data.split('\n'))
    const descriptions = data.split('\n').map(desc => desc.toLowerCase())
    const matchedDesc = descriptions.find(desc => desc.includes(keyword))
    console.log(matchedDesc)
    const movieName = keyword
    const movieDesc = matchedDesc
    res.render(__dirname + "/views/pages/searchResult", { movieName, movieDesc }) 
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});