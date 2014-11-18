(function() {
	var app = angular.module('resource', ['currentUser']);
	app.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	});
	//Course description
	app.controller('PolicyController', ['$http', function($http){
		var ctrl = this;
		$http.get('ajax/policy.json').success(function(data){
			ctrl.policy = data;
		});
	}]);

	app.controller('ResourceController', ['$http', function($http){
		var ctrl = this;

		//Load resoource
		ctrl.loadResource = function() {
			//insert page & sort mode args here
			$http.get("ajax/resource.json").success(function(data){
				ctrl.resources = data.resources;
				ctrl.courseName	 = data.courseName;
			});

		}();

		ctrl.download = function(arg) {
			ctrl.response = [];
			alert("GET downloadID="+ ctrl.resources[arg].resourceId);
			$http.get("ajax/downloadResponse.json?downloadID="+ ctrl.resources[arg].resourceId).success(function(data){
				ctrl.response = data;
			});
		};

		
	}]);

})();
