var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var webRoutes = require('./web/web');
var log1 = require('./middleware/log1');
var toDoRoutes = require('./api/routes/toDo');
// var morgan = require('morgan')

var app = express();

mongoose.connect('mongodb://localhost/toDo');

// bodyParser.json(option) returns middleware that only parses json 
app.use(bodyParser.json());

//bodyParser.urlencoded(option) returns middleware that only
//parses the urlencoded bodies
// a new body object containing the parsed data is populated 
//on the request object after the middleware (i.e. req.body). 
//This object will contain key-value pairs, where the value can 
//be a string or array (when extended is false), or any type 
//(when extended is true).
app.use(bodyParser.urlencoded({extended: true}));

log1(app);

toDoRoutes(app);
webRoutes(app);

// process is window(global object) for node
var port = process.env.PORT;
app.listen(port, function(){
	console.log('this app is listening at port number ' + port);
});