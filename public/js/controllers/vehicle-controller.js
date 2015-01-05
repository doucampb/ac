
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

