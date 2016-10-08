(function(){
   'use strict';

	 angular
  		.module('module2', [])
		.controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('buyer', Buyer);

 
   ToBuyController.$inject = 
   AlreadyBoughtController.$inject = ["$scope", "buyer"];


   function ToBuyController($scope, buyer) {
		$scope.tobuy.list = buyer.tobuy();
        $scope.tobuy.buy  = function ($index) {
            buyer.buy($index);
        }
   }   

   function AlreadyBoughtController($scope, buyer) {
      $scope.bought.list = buyer.bought();
   }

   function Buyer () {
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
