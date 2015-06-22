var log1 = function(app){

	// req is an object express built that has all the request information of the http request
	// res is an object express built that has all the response information
	// next is needed to be used to call the next function in line
	app.use(function(req, res, next){
		console.log(req.method + ' ' + req.url);

		next();
	});
};

// module.exports makes log1(middleware/function) available to the node server to be used 
module.exports = log1;