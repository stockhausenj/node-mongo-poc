var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var app = express();
var creds = fs.readFileSync(__dirname + '/mongodb.creds');
var jsonContent = JSON.parse(creds);
var user = jsonContent.user;
var pwd = jsonContent.pwd;
var server = jsonContent.server;
var mongoUrl = 'mongodb://' + user + ':' + pwd + '@' + server + '/heroes';
var views = __dirname + '/views/';

app.get('/', (req, res, next) => {
	res.sendFile(views + 'add_movie.html');
});

app.listen(8080, (req, res, next) => console.log("Listening on port 8080"));
