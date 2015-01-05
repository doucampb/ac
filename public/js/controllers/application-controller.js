/**
 * @ngdoc   controller
 * @name    ac.main:ApplicationController
 * @module  ac.main
 *
 * @description Application wide controller
 */
angular.module('ac.main').controller('ApplicationController', [
    '$scope',
    '$location',
    'apiService',
    function ($scope, $location, apiService) {

        /**
         * @ngdoc      property
         * @name       ApplicationController#stockRef
         * @propertyOf ac.main:ApplicationController
         *
         * @description The stock reference
         * @type {String}
         */
        $scope.stockRef = '';

         /**
         * @ngdoc      property
         * @name       ApplicationController#registration
         * @propertyOf ac.main:ApplicationController
         *
         * @description The registration plate for the car
         * @type {String}
         */
        $scope.registration = '';

        /**
         * @ngdoc    function
         * @name     ApplicationConroller#findCar
         * @methodOf ac.main:ApplicationController
         *
         * @description Navigates to the view which will display the images for the obfuscated stock reference
         * @type {String}
         */
        $scope.findCar = function () {
            // Make the restful API call and navigate to the appropriate view
            apiService.getObfuscatedStockRef($scope.stockRef, $scope.registration).then(function(data) {
                $scope.obfuscatedStockRef = data;
                $location.path('/vehicle/' + $scope.obfuscatedStockRef);
            });
        };
    }
]);

