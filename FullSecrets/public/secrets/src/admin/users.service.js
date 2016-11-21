(function(){
	"use strict";
	angular
	.module('secretAdmin')
	.service('UserService', UserService);


	UserService.$inject = ["$http", 'session'];

	function UserService($http, session) {
		var service = this;

		service.getAll=function(){
	      return $http
	        .get('/users', session.xAccessHeader() )
	        .then(
	         function(response){
	           return response.data;	             
	         }, 
	         function (response){ 
	         	return null;
	        });
		};
	}
})();