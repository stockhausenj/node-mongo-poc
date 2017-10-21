"use strict";

const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

const app = express();
const creds = fs.readFileSync(path.join(__dirname, 'mongodb.creds'));
const jsonContent = JSON.parse(creds);
const user = jsonContent.user;
const pwd = jsonContent.pwd;
const server = jsonContent.server;
const mongoUrl = 'mongodb://' + user + ':' + pwd + '@' + server + '/heroes';
const views = path.join( __dirname, 'views');

app.get('/',function(req, res, next){
	res.sendFile(views+'/add_movie.html');
});


app.listen(8080, (req, res, next) => console.log("Listening on port 8080"));
