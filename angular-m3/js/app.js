(function(){
	'use strict'

	angular
        .module     ('NarrowItDownApp',[])
		.controller ('narrow-it-down-controller', NarrowItDownController)
        .service    ('menu-search-service', MenuSearchService)
        .directive  ('foundItems', FoundItemsDirective);  
     

	NarrowItDownController.$inject=['menu-search-service'];
    function NarrowItDownController (search) {
		var narrow = this;
        narrow.found = [];
        narrow.input = "";
		
		narrow.search = function () {
			narrow.touched = true;
			 if ( narrow.input.length > 0 )
				 narrow.found = search.getMatchedMenuItems(narrow.input)
		                .then (function (result) {                   
							narrow.found = result;
					    });s
        }

        narrow.onRemove = function (index) {
			narrow.found.splice(index, 1);
        }
        
    }

 	MenuSearchService.$inject= ['$http'];

    function MenuSearchService ($http) {

		var search = this;

        search.getMatchedMenuItems = function (searchTerm) {
			return $http ({
					  method: 'GET',
					  url   : 'https://davids-restaurant.herokuapp.com/menu_items.json'
					}).then(function(result){
						var filtered = [];
                        searchTerm = searchTerm.toLowerCase().split(" ");                       
	                    for (var i in result.data.menu_items) {
							var value = result.data.menu_items[i]; 
							 for (var s in searchTerm) {
			                    if ((searchTerm[s].trim().length > 0) && 
                                    (value.name.toLowerCase().indexOf(searchTerm[s]) !== -1        ||
			                        value.description.toLowerCase().indexOf(searchTerm[s]) !== -1 ||
			                        value.short_name.toLowerCase().indexOf(searchTerm[s]) !== -1 )){ 
									filtered.push(value);	
								    break;
			                    } 
	                        }
                         }
                    	  
						return filtered;						
                    });
        }
    }

    function FoundItemsDirective () {
		return { 
            scope        : {
							  found : '<items',
                              remove: '&onRemove'
						   },
			templateUrl : "found-item.html"
		};
    }

})();
