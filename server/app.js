var express = require('express');
var webRoutes = require('./web/web-routes');
var log1 = require('./middleware/log1');
var apiRoutes = require('./api/api-routes');
// var morgan = require('morgan')

var app = express();

log1(app);
// app.use(morgan('dev'));

webRoutes(app);
apiRoutes(app);


// process is	the window(global object) for node
var port = process.env.PORT;
app.listen(port, function(){
	console.log('this app is listening at port number ' + port);
});