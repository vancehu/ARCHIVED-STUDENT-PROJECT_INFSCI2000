(function() {
	var app = angular.module('profile', ['currentUser']);
	app.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	});
	//Course description

	app.controller('ProfileController', ['$http', function($http){
		var ctrl = this;

		//Load resoource
		ctrl.loadProfile = function() {
			//insert page & sort mode args here
			$http.get("ajax/profile.json").success(function(data){
				ctrl.username = data.username;
				ctrl.email = data.email;
				ctrl.credit	 = data.credit;
				ctrl.history = data.history;
			});

		}();


		
	}]);
})();
