var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
// home page
app.get('/', function(req, res) {
    res.render('pad');
});

// document id
app.get('/(:id)', function(req, res) {
    res.render('pad');
  });

// get sharejs dependencies
var sharejs = require('share');
require('redis');

// options for sharejs
var options = {
    db: {type: 'redis'},
};

sharejs.server.attach(app, options);

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);
console.log("Server is running: http://localhost:8000/");