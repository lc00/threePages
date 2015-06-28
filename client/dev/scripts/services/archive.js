(function(){
	angular
		.module('threePages')
		.factory('archiveFactory', ['$http', function($http){

			var archiveFactory = {};
			
			archiveFactory.add = function (archiveList) {
            return $http.post('/api/v1/archive/add', archiveList);
        };

			return archiveFactory;
		}]);

}());