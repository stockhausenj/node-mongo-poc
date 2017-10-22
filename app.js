// Import modules.
const express = require("express"),
  mongoClient = require("mongodb").MongoClient,
  fs = require("fs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  assert = require("assert");

// Create express application.
const app = express();

// Enables the return of an object that contains the parsed request body.
app.use(bodyParser.urlencoded({ extended: true }));

// File System object returns contents of the path.
const creds = fs.readFileSync(path.join(__dirname, "mongodb.creds"));

const jsonContent = JSON.parse(creds);
const user = jsonContent.user;
const pwd = jsonContent.pwd;
const server = jsonContent.server;
const mongoUrl = "mongodb://" + user + ":" + pwd + "@" + server + "/video";
const views = path.join(__dirname, "views");

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
    app.use((err, req, res) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
    let server = app.listen(8080, function() {
      let port = server.address().port;
      console.log("Express server listening on port %s.", port);
    });
  })
  .catch(err => console.log(err));
