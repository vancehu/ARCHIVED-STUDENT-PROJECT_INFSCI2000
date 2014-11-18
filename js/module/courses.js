(function() {
	var app = angular.module('courses', ['currentUser']);
	app.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	});
	//Course description
	app.controller('CourseDescriptionController', ['$http', function($http){
		var ctrl = this;
		$http.get('ajax/courseDescription.json').success(function(data){
			ctrl.course = data;
		});
	}]);

	app.controller('ReviewController', ['$http', function($http){
		var ctrl = this;
		ctrl.page = 1;
		ctrl.reviewPerPage = 5; //read-only
		ctrl.sortByMostHelpful = true; //otherwise sort by most recent
		ctrl.currReplyBox = -1;

		//Load Review
		ctrl.refreshReviews = function() {
			alert("GET Request: page="+ctrl.page+"&reviewPerPage="+ctrl.reviewPerPage+"&sortByMostHelpful="+ctrl.sortByMostHelpful)
			$http.get("ajax/reviews.json?page="+ctrl.page+"&reviewPerPage="+ctrl.reviewPerPage+"&sortByMostHelpful="+ctrl.sortByMostHelpful).success(function(data){
				ctrl.reviews = data.reviews;
				ctrl.reviewsCount = data.reviewsCount;
			});
		};
		ctrl.refreshReviews();

		//Page controller
		ctrl.getTotalPages = function() {
			return Math.floor(ctrl.reviewsCount / ctrl.reviewPerPage)+1;
		};
		ctrl.getCurrPageInfo = function(){
			firstReview = (ctrl.page - 1) * ctrl.reviewPerPage + 1;
			lastReview = firstReview + ctrl.reviewPerPage - 1;
			if (lastReview > ctrl.reviewsCount) {
				lastReview = ctrl.reviewsCount
			};
			return	firstReview	+ "-" + lastReview + " of " + ctrl.reviewsCount;
		};
		ctrl.isFirstPage = function(){
			return ctrl.page === 1;
		};
		ctrl.isLastPage = function(){
			return ctrl.page === ctrl.getTotalPages();			
		};
		ctrl.isCurrPage = function(currPage){
			return currPage === ctrl.page;
		};
		ctrl.setPage = function(newPage) {
			ctrl.page = newPage;
			ctrl.refreshReviews();
			ctrl.getCurrPageInfo();
		};
		ctrl.setSortMode = function(newMode) {
			ctrl.sortByMostHelpful = newMode;
			ctrl.getCurrPageInfo();
		};

		//Main form validation and posting
		ctrl.isNotValid = function() {
			return false;
			return  (!(/20\d\d/.test(ctrl.year))) || (ctrl.star === undefined) || (ctrl.term === undefined) || (ctrl.body === undefined) || (ctrl.body === "");
		};
		ctrl.postReply = function() {
			alert("POST REPLY - IMPLEMENT LATER");
		};
		ctrl.postForm = function() {
			alert("POST FORM DATA")
			$http.post('ajax/reviewResponse.json', {year:ctrl.year, term:ctrl.term, body:ctrl.body, star:ctrl.star}).success(function(data){
				ctrl.response = data;
				if(ctrl.response.code == 1){
					ctrl.refreshReviews();
				}
			});
		};
		ctrl.isResponseCode = function(curr) {
			return 1;
		};

		//set reply
		ctrl.setReplyBox = function(curr) {
			ctrl.currReplyBox = curr;
			ctrl.reply = "";
		};
		ctrl.isCurrReplyBox = function (curr) {
			return ctrl.currReplyBox == curr;
		};
		ctrl.isReplyNotValid = function() {
			return  (ctrl.reply === undefined) || (ctrl.reply === "");
		};

		
	}]);

/*
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
		ctrl.courses = [];
		ctrl.getCourse = function(arg){
			ctrl.showFlag = false;

			$http.get('ajax/getCourseCatalog'+ arg + '.json').success(function(data){
				ctrl.courses = data.courses;
				ctrl.showFlag = true;
			});  
		};
	}]);
*/
})();
