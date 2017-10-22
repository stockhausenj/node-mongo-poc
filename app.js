// Import modules
const express = require("express"),
  mongoClient = require("mongodb").MongoClient,
  fs = require("fs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  assert = require("assert");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const creds = fs.readFileSync(path.join(__dirname, "mongodb.creds"));
const jsonContent = JSON.parse(creds);
const user = jsonContent.user;
const pwd = jsonContent.pwd;
const server = jsonContent.server;
const mongoUrl = "mongodb://" + user + ":" + pwd + "@" + server + "/video";
const views = path.join(__dirname, "views");

function errorHandler(err) {
  console.error(err.message);
  console.error(err.stack);
}

mongoClient
  .connect(mongoUrl)
  .then(db => {
    app.get("/", function(req, res) {
      res.sendFile(views + "/add_movie.html");
    });
    app.post("/add_movie", function(req, res) {
      let title = req.body.title;
      let year = req.body.year;
      let imdb = req.body.imdb;
      db
        .collection("movies")
        .insertOne({ title: title, year: year, imdb: imdb }, function(err, r) {
          assert.equal(null, err);
          res.send("Document inserted with _id: " + r.insertedId);
        });
    });
    app.use(errorHandler);
    app.listen(8080);
  })
  .catch(err => console.log(err));
