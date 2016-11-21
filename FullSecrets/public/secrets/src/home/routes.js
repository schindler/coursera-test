(function(){
	"use strict";
                    
	angular.module('AppSecrets').config(routeConfig);

    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function routeConfig($stateProvider, $urlRouterProvider) {
    	 $urlRouterProvider.otherwise('/');
		 $stateProvider
		    .state('home', {
		      url: '/',
		      templateUrl: 'src/home/home.html'
		    })
		    .state('users',{
				url: '/users',
				templateUrl : 'src/admin/users.html',
				controller  : 'UserController',
				controllerAs: 'ctrl',
				resolve: {
					users: ['UserService', function (UserService) {
					  return UserService.getAll();
					}]
				}
		    });
	};

})();