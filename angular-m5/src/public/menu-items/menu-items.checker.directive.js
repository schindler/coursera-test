(function () {
"use strict";

angular.module('public')
.directive('menuItemChecker', MenuItemChecker);

 
function MenuItemChecker() {
   return  {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            items     : '<'
        },
        // the 'require' property says we need a ngModel attribute in the declaration.
        // this require makes a 4th argument available in the link function below
        require: 'ngModel',
        // the ngModelController attribute is an instance of an ngModelController
        // for our current ngModel.
        // if we had required multiple directives in the require attribute, this 4th
        // argument would give us an array of controllers.
         link: function(scope, iElement, iAttrs, ngModelController) {
             function checkValidity() {
             	var l = angular.isDefined(scope.items) ? scope.items : [];
                var v = String(ngModelController.$viewValue).toLowerCase();
                var s = $.grep(l, function(item){ return item.short_name.toLowerCase() == v; });

                ngModelController.$setValidity('invalid-item-code', s.length>0);

                if (s.length>0) {
                	v = (s[0].short_name);
                }              

                return v;
            }

            // when view change, cast to integer
            ngModelController.$parsers.push(function(value) {  
                checkValidity();
                return value;
            });

            var superRender = ngModelController.$render;

            ngModelController.$render = function() {   
                checkValidity();
                superRender();
            };
         
            checkValidity();
        }
   };
}

})();
