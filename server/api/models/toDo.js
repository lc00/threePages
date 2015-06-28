var mongoose = require('mongoose');

var toDoSchema = mongoose.Schema({
	name: String,
	done: Boolean,
	archive: Boolean

});


var ToDo = mongoose.model('toDo', toDoSchema);

module.exports = ToDo;