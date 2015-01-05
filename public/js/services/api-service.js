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
