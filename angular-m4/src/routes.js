(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Menu page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    resolve: {
      items: ['MenuDataService',
            function (MenuDataService) {
              return MenuDataService.getAllCategories();
            }]
    },
    controller   : ['items', function (items) { this.items = items; } ],
    controllerAs : 'data'
  })
  
   // Items page
  .state('items', {
    url: '/items/{categoty_id}',
    templateUrl: 'src/templates/items.template.html',
    resolve: {
      items: ['$stateParams', 'MenuDataService', '$state',
                function ($stateParams, MenuDataService, $state) {               
                 return MenuDataService.getItemsForCategory($stateParams.categoty_id);
            }]
    },
    controller   : ['items', '$state', function (items, $state) { 
                                 
                                 this.items   =items.menu_items; 
                                 this.category=items.category;                                
                                 if (undefined == this.category)
                                   $state.go('home');
                                 
                              } ],
    controllerAs : 'data'
  });
}

})();
