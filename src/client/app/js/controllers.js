'use strict';

/* Controllers */

var appControllers = angular.module('myApp.controllers', []);

appControllers.controller('ProductController', ['$scope', '$http', function($scope, $http) {
  $http.get('/django/inventory/').success(function(data) {
    $scope.products = data;
  });
}]);

appControllers.controller('ProductControllerAdd', ['$scope', '$http', function($scope, $http) {
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $scope.product = {
      "itemId": "please-enter-an-id",
      "name": "Product Name",
      "count": 0,
      "short": "Enter a short description",
      "desc": "Enter a longer description"
    };

    $scope.save = function() {
      var transform = function(data){
          return $.param(data);
      }

      $http.post("/django/create/inventory/", $scope.product, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
      }).success(function(responseData) {
        // go back to the main product listing
        window.location = '#/products';
      });
    };

}]);

appControllers.controller('ProductDetailsController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/django/inventory/' + $routeParams.id).success(function(data) {
      $scope.product = data[0];
    });
    $scope.back = function() {
      window.location = '#/products';
    };
    $scope.save = function() {
      var transform = function(data){
          return $.param(data);
      }

      $http.post("/django/update/inventory/" + $routeParams.id, $scope.product, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
      }).success(function(responseData) {
        // go back to the main product listing
        window.location = '#/products';
      });
    };
    $scope.remove = function() {
      $http.get('/django/delete/inventory/' + $routeParams.id).success(function(data) {
        window.location = '#/products';
      });
    };
}]);
