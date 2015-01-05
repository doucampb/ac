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

