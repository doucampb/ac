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


// Source: public/js/controllers/vehicle-controller.js
/**
 * @ngdoc   controller
 * @name    ac.main:VehicleController
 * @module  ac.main
 *
 * @description Used for retrieving the image hyperlinks which are then displayed in the partial
 */
angular.module('ac.main').controller('VehicleController', [
    '$scope',
    '$routeParams',
    'apiService',
    function ($scope, $routeParams, apiService) {

        /**
         * @ngdoc      property
         * @name       ApplicationController#obfuscatedStockReference
         * @propertyOf ac.main:ApplicationController
         *
         * @description The obfuscated stockReference
         * @type {String}
         */
        $scope.obfuscatedStockReference = $routeParams.obfuscatedStockReference;
 
        // Retrieve the image hyperlinks that will be displayed in the partial
        apiService.getImageLinks($scope.obfuscatedStockReference).then(function(data) {
            $scope.imageUrls = data;
        });

        /**
         * @ngdoc    function
         * @name     VehicleController#setImage
         * @methodOf ac.main:VehicleController
         *
         * @description The full image url for the thumbnail is passed in and we replace 350px by 800 to show the enlarged image.
         * @param {String} The image url
         */
        $scope.setImage = function (image) {
            var res = image.replace("350", "800");
            $scope.imagePreview = res;
        };
    }
]);


// Source: public/js/services/api-service.js
/**
 * @ngdoc   service
 * @name    ac.main:apiService
 * @module  ac.main
 *
 * @description
 * A service which is used for making the RESTful API calls
 */
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
