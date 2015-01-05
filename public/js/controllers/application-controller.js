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

        $scope.stockRef = '';

        $scope.registration = '';

        $scope.findCar = function () {

            apiService.getObfuscatedStockRef($scope.stockRef, $scope.registration).then(function(data) {
                $scope.obfuscatedStockRef = data;
                $location.path('/vehicle/' + $scope.obfuscatedStockRef);
            });


        };
    }
]);

