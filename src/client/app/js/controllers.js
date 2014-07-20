'use strict';

/* Controllers */

var appControllers = angular.module('myApp.controllers', []);

appControllers.controller('ProductController', ['$scope', '$http', function($scope, $http) {
  $http.get('/django/inventory').success(function(data) {
    $scope.products = data;
  });
}]);

appControllers.controller('ProductControllerAdd', ['$scope', '$http', 'api', function($scope, $http, api) {
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';

    $scope.product = {"fields":{
        "itemId": "enter-an-item-id",
        "name": "Product Name",
        "count": 0,
        "short": "Short Product Description",
        "desc": "Longer Product Description"
    }};

    $scope.save = function() {
        api.inventory.save($scope.product);
        window.location = '#/products';
    };

}]);

appControllers.controller('ProductDetailsController', ['$scope', '$routeParams', '$http', 'api', function($scope, $routeParams, $http, api) {
    api.inventory.query({id: $routeParams.id}, function(data) {
        $scope.product = data[0];
    });
    $scope.back = function() {
        window.location = '#/products';
    };
    $scope.save = function() {
        api.inventory.save($scope.product);
        window.location = '#/products';
    };
    $scope.remove = function() {
        api.inventory.delete({ id: $scope.product.fields.itemId });
        window.location = '#/products';
    };
}]);
