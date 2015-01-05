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