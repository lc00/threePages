(function(){
	var app = angular.module('threePages', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/toDo');

		$stateProvider		
			.state('toDo', {
				url: '/toDo',
				controller: 'ToDoController',
				templateUrl: '../views/toDo.html'
			})
			.state('archive', {
				url: '/archive',
				controller: 'ArchiveController',
				templateUrl: '../views/archive.html'
			});
	});
}());	