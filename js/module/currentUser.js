(function() {
  var app = angular.module('currentUser',[]);
  app.controller('CurrentUserController', ['$http', function($http){
    var ctrl = this;
    $http.get('ajax/currentUserInfo.json').success(function(data){
      ctrl.currentUser = data;
    });
    this.isSignedIn = function(){
     return ctrl.currentUser !== undefined;
   };
   this.logOut = function(){
   	alert("POST logout=true");
   	$http.get('#').success(function(data){
    		alert("Manually reload the page now (will fix later)");
    });
   }
 }]);
})();
