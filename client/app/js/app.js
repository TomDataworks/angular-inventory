'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products', {templateUrl: 'partials/products.html', controller: 'ProductController'});
  $routeProvider.when('/products/:id', {templateUrl: 'partials/product-details.html', controller: 'ProductDetailsController'});
  $routeProvider.when('/product/add', {templateUrl: 'partials/add-product.html', controller: 'ProductControllerAdd'});
  $routeProvider.otherwise({redirectTo: '/products'});
}]);
