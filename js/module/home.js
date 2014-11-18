(function() {
	var app = angular.module('home', ['currentUser']);

	app.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	});
	//Featured review
	app.controller('FeaturedReviewController', ['$http', function($http){
		var ctrl = this;
		$http.get('ajax/featuredReviews.json').success(function(data){
			ctrl.reviews = data.reviews;
		});
	}]);

	//Featured review indicator
	app.controller('IndicatorController', function($http){
		this.current = 0;
		this.setCurrent = function(newIndicator) {
			this.current = newIndicator || 0;
		}
		this.isCurrent = function(curr){
			return curr === this.current;
		}
	});

	//Course pop-up menu
	app.controller('PopupController', ['$http', function($http){
		var ctrl = this;
		ctrl.showFlag = false;
		ctrl.catalogs = [];
		ctrl.getCourse = function(){
			ctrl.showFlag = false;

			$http.get('ajax/getCourseCatalog.json').success(function(data){
				ctrl.catalogs = data.catalogs;
				ctrl.showFlag = true;
			});  
		}();
		ctrl.setPopup = function(arg){
			ctrl.popup = ctrl.catalogs[arg].courses;
		}
	}]);
})();
