// toDo model
var ToDo = require('../models/toDo');

var mongoose = require('mongoose');

var ToDoController =  function(){};

ToDoController.prototype.get = function(req, res, next){
	ToDo.find({archive: false}, function(err, toDos){
		if (err)  return res.send(err);
		res.status(201).send(toDos);
	}); 
};

ToDoController.prototype.add = function(req, res, next){
	var newToDo = new ToDo({
		name: req.body.name, 
		done: req.body.done,
		archive: req.body.archive
	});

	newToDo.save(function(err, data){
		if (err)  return console.log(err);
		res.status(201).send(data);
	});

};

ToDoController.prototype.updateList = function(req, res, next){
	console.log('**************');
	// update archive property of each item
	req.body.forEach(function(toDo){
		console.log('before-save '+ toDo.name+ ' '+ toDo.archive);
		ToDo.update({_id: toDo._id}, {$set: {archive: true}}, function(err, toDo){
			if(err)  console.log(err);
			console.log('saved ' + toDo.name + ' ' + toDo.archive);
		});
	});

	ToDo.find({archive: false}, function(err, toDos){
		if(err) res.send(err);
		res.status(201).send(toDos);
	});

};

ToDoController.prototype.getArchive = function(req, res, next){
	ToDo.find({archive: true}, function(err, toDos){
		if(err) res.send(err);
		res.status(202).send(toDos);
	});
};

ToDoController.prototype.updateDone = function(req, res, next){
	ToDo.findByIdAndUpdate(req.params.id, req.body, function(err){
		if(err) res.status(500).send(err);
		res.sendStatus(202);
	});
};

module.exports = ToDoController;

