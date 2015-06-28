var ToDoController = require('../controllers/toDo');

var toDoController = new ToDoController();

var toDoRoutes = function(app){
	app.get('/api/v1/toDo', toDoController.get);
	app.post('/api/v1/toDo/add', toDoController.add);
	app.post('/api/v1/toDo/updateList', toDoController.updateList);
	app.put('/api/v1/toDo/:id', toDoController.updateDone);
	// app.put('/api/v1/toDo/updateList', toDoController.updateList);
	// app.delete('/api/v1/toDo', toDoController.delete);

	app.get('/api/v1/archive/get', toDoController.getArchive);
	// app.post('/api/v1/archive/add', toDoController.add);
	// app.put('/api/v1/archive/update', toDoController.update);
	// app.delete('/api/v1/archive/delete', toDoController.delete);

};

module.exports = toDoRoutes;