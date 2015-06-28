(function(){
	var ToDoController = function($scope, $rootScope, $http, archiveFactory){
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
		setInterval(getAllToDo, 10000);


		//add toDoList
		$scope.add = function(item){
			var newItem = { 
				name: item,
				done: false,
				archive: false
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
			var archiveList =[];

			angular.forEach($scope.toDoList, function(el, index){
				if(el.done)  archiveList.push(el);
			});

			$http
				.post('/api/v1/toDo/updateList', archiveList)
				.success(function(data, status){
					$scope.toDoList = data;
					// console.log(data);
				})
				.error(function(data, status){
					console.log(data);
			});

			// archiveFactory.add(archiveList)
			// 	.success(function(data, status){
			// 		console.log(data);
			// 	})
			// 	.error(function(data, status){
			// 		console.log(data);
			// 	});		

			// $rootScope.toDoList = newToDoList
			// $rootScope.archiveList = archiveList;
			// console.log($rootScope.archiveList);
		};

		$scope.updateDone = function(item){
			$http
				.put('api/v1/toDo/' + item._id, item)
				.error(function(data, status){
					console.log(data);
				});
		};
	};

	ToDoController.$inject = ['$scope', '$rootScope', '$http', 'archiveFactory'];

	angular
		.module('threePages')
		.controller('ToDoController', ToDoController);
}());