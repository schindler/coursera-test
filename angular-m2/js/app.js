(function(){
   'use strict';

	 angular
  		.module('ShoppingListCheckOff', [])
		  .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

 
   ToBuyController.$inject = 
   AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"];


   function ToBuyController($scope, buyer) {
		$scope.tobuy.list = buyer.tobuy();
        $scope.tobuy.buy  = function ($index) { 
            buyer.buy($index);
        }
   }   

   function AlreadyBoughtController($scope, buyer) {
      $scope.bought.list = buyer.bought();
   }

   function ShoppingListCheckOffService () {
		var buyer = this;
        var tobuy = [{ name: "bananas", quantity : 2},   
                     { name: "farinha", quantity : 4},
                     { name: "cookies", quantity : 8},
                     { name: "balas",   quantity : 9},
                     { name: "limao",  quantity  : 1}];
        var bought = [];


       buyer.tobuy = function () {
		   return tobuy;
       }

       buyer.bought = function () {
		   return bought;
       }

       buyer.buy = function ($index) {
          bought.push (tobuy[$index]);
          tobuy.splice($index, 1);
       }      
   }

}) ();
