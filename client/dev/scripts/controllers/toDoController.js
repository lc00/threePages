(function(){
	var ToDoController = function($scope, $rootScope, $http){
		$scope.toDoList = [];
		var getAllToDo = function(){
			$http
				.get('/api/v1/toDo')
				.success(function(toDos, status){

				$scope.toDoList = toDos;

				})
				.error(function(err, status){
					console.log(err);
				});
		};

		getAllToDo();


		//add toDoList
		$scope.add = function(item){
			var newItem = { 
				name: item,
				done: false
			};


			$http
				.post('/api/v1/toDo/add', newItem)
				.success(function(data, status){
					$scope.toDoList.push(newItem);
				})
				.error(function(data, status){
					console.log(data);
				});


			$scope.itemInput = null;
		};

		// archive toDo
		$scope.archive = function(){
			var newToDoList = [];
			var archiveList =[];

			angular.forEach($scope.toDoList, function(el, index){
				if(!el.done)  newToDoList.push(el);
				else  archiveList.push(el);

			});
			$scope.toDo = newToDoList;
			// $rootScope.toDoList = newToDoList
			// $rootScope.archiveList = archiveList;
			// console.log($rootScope.archiveList);
		};
	};

	ToDoController.$inject = ['$scope', '$rootScope', '$http'];

	angular
		.module('threePages')
		.controller('ToDoController', ToDoController);
}());