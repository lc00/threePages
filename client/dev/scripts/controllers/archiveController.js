(function(){
	var ArchiveController = function($scope, $http){

		var getAllArchive = function(){
			$http
				.get('/api/v1/archive/get')
				.success(function(data, status){
					$scope.archiveList = data;	
				})
				.error(function(data, status){
					console.log(data);
				});
		};

		getAllArchive();

	};

	ArchiveController.$inject = ['$scope', '$http'];

	angular
		.module('threePages')
		.controller("ArchiveController", ArchiveController);

}());