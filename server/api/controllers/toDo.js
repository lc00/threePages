// toDo model
var ToDo = require('../models/toDo');

var mongoose = require('mongoose');

var ToDoController =  function(){};
ToDoController.prototype.get = function(req, res, next){
	ToDo.find({}, function(err, toDos){
		if (err)  return res.send(err);
		res.status(201).send(toDos);
	}); 
};

ToDoController.prototype.add = function(req, res, next){
	var newToDo = new ToDo({
		name: req.body.name, 
		done: req.body.done
	});

	newToDo.save(function(err, data){
		if (err)  return console.log(err);
		res.status(201).send(data);
	});

};



module.exports = ToDoController;

