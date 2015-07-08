var express = require('express');
var ToDo = require('../api/models/toDo');
var clientDir = process.env.CLIENT_DIR;

//webRoutes are all the api requests by index.html on the browser side
var webRoutes = function(app){
	// serve files that has routes that have '/lib' from '/../../bower_components' directory
	app.use('/lib', express.static(__dirname + '/../../bower_components'));

	// serves all files under 
	app.use(express.static(__dirname + '/../../client/' + clientDir));

	// app.use('/images', express.static(__dirname + '/../../client/' + clientDir + '/images'));
	// app.use('/scripts', express.static(__dirname + '/../../client/' + clientDir + '/scripts'));
	// app.use('/styles', express.static(__dirname + '/../../client/' + clientDir + '/styles'));
	// app.use('/views', express.static(__dirname + '/../../client/' + clientDir + '/views'));

	// req is an object express built that has all the request information of the http request
	// res is an object express built that has all the response information
	app.get('*', function(req, res){

		var options = {
			root: __dirname + '/../../client/' + clientDir,
			// denies any dotfiles for security 
			dotfiles: 'deny'
		};

		res.sendFile('index.html', options, function(err){
			if(err) return res.sendStatus(err.status);

			console.log('index.html is sent');
			
		});
	});
};

module.exports = webRoutes;