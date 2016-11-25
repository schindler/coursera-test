(function(){
	"use strict";
	angular
	  .module("util")
	  // usage: <input type="text" ng-show="editing" util-focus-on-show />
	  .directive('utilFocusOnShow', ["$timeout", function($timeout) {
		    return {
		        restrict: 'A',
		        link:  function($scope, $element, $attr) {
		            if ($attr.ngShow){
		                $scope.$watch($attr.ngShow, function(newValue){ 
		                    if(newValue){
		                        $timeout(function(){
		                            $element[0].focus();
		                        }, 0);
		                    }
		                })      
		            } else if ($attr.ngHide){
		                $scope.$watch($attr.ngHide, function(newValue){
		                    if(!newValue){
		                        $timeout(function(){
		                            $element[0].focus();
		                        }, 0);
		                    }
		                })      
		            }

		        }
		    };
		}])
	  .directive('utilFocusOn', ["$timeout", function($timeout) {
		    return {
		        restrict: 'A',
		        link: function($scope, $element, $attr) {
		        	console.log("utilFocusOn:"+$attr.utilFocusOn);
		            if ($attr.utilFocusOn){
		                $scope.$watch($attr.utilFocusOn, function(value){ 
		                    if(value){
		                        $timeout(function(){
		                            $element[0].focus();
		                        }, 0);
		                    }
		                })      
		            } 
		        }
		    };
		}]);
})();