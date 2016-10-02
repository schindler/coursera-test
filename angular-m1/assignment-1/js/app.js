(function () {
'use strict';
  
angular
  .module('app', [])
  .controller('check-controller', CheckController);

CheckController.$inject = ['$scope'];

var msgs = ["Please enter data first", "Enjoy!", "Too much!"];

function validateNItens(value) {
    var total = 0;
	var elements = value.split(",");
    var index = 0;
    for (var t in elements) {
       if (elements[t].trim().length > 0) { 
	      total++;
          index = 1;
 		  if (total > 3) {index = 2; break;}
	   }      
    }
    return msgs[index];
}

function CheckController ($scope) {
	$scope.result = "";
    $scope.itens  = "";
    $scope.validate = function () {
	   $scope.result = validateNItens($scope.itens);
    };
    $scope.selectColor = function(value){
		return (msgs[0] == value) ? "red" : "green";
    };
};

})();
