(function(){
	var ArchiveController = function($scope, $rootScope){
		// $scope.archiveList = $rootScope.archiveList;
		// $scope.archiveList = [{name: "dance", done: 'true'}];
	};

	ArchiveController.$inject = ['$scope', '$rootScope'];

	angular
		.module('threePages')
		.controller("ArchiveController", ArchiveController);

}());