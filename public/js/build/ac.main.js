'use strict';
// Source: public/js/ac-main.js
/**
 * Define angularJS module
 */
angular.module('ac.main', ['ngRoute']);

/**
 * Setup the routing
 */
angular.module('ac.main').config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/vehicle', {
                templateUrl: '/assets/default.html'
            })
            .when('/vehicle/:obfuscatedStockReference', {
                templateUrl: '/assets/vehicle.html',
                controller: 'VehicleController'
            })
            .otherwise({
                redirectTo: '/vehicle'
            });
    }
]);
// Source: public/js/controllers/application-controller.js
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


// Source: public/js/controllers/vehicle-controller.js

angular.module('ac.main').controller('VehicleController', [
    '$scope',
    '$routeParams',
    'apiService',
    function ($scope, $routeParams, apiService) {

        $scope.obfuscatedStockReference = $routeParams.obfuscatedStockReference;
 
        apiService.getImageLinks($scope.obfuscatedStockReference).then(function(data) {
            $scope.imageUrls = data;
            console.log($scope.imageUrls);
        });

        $scope.setImage = function (image) {
            var res = image.replace("350", "800");
            $scope.imagePreview = res;
        };
    }
]);


// Source: public/js/services/api-service.js

angular.module('ac.main').factory('apiService', function ($http, $log, $q) {
    return {
        getImageLinks: function (obfuscatedStockRef) {
            var deferred = $q.defer();
            $http.get('/api/carImages/obfuscatedStockRef/' + obfuscatedStockRef)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        },
        getObfuscatedStockRef: function (stockRef, registration) {
            var deferred = $q.defer();
            $http.get('/api/stockReference/' + stockRef + '/registration/' + registration)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        },
    };
});
