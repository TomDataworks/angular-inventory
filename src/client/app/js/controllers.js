'use strict';

/* Controllers */

var appControllers = angular.module('myApp.controllers', []);

// Application controller for the main product index
appControllers.controller('ProductController', ['$scope', 'api', function($scope, api) {
    // Query the database for list of products and set the model
    api.inventory.query(function(data) {
        $scope.products = data;
    });
}]);

// Application controller for adding a product
appControllers.controller('ProductControllerAdd', ['$scope', '$http', 'api', function($scope, $http, api) {
    // Make sure the cross-site scripting values are set correctly
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';

    // Create a product template in the model, that Django can consume
    $scope.product = {"fields":{
        "itemId": "enter-an-item-id",
        "name": "Product Name",
        "count": 0,
        "short": "Short Product Description",
        "desc": "Longer Product Description"
    }};

    // Save to the database through the API
    $scope.save = function() {
        api.inventory.save($scope.product);
        window.location = '#/products';
    };

}]);

// Application controller for Product Details view
appControllers.controller('ProductDetailsController', ['$scope', '$routeParams', 'api', function($scope, $routeParams, api) {
    // Query the database and set the view
    api.inventory.query({id: $routeParams.id}, function(data) {
        // Only return the first result - a queryset can return multiple
        $scope.product = data[0];
    });
    // Back button handler
    $scope.back = function() {
        // Back up to main view, user requested it
        window.location = '#/products';
    };
    // Save button handler, call the API to save the product
    $scope.save = function() {
        api.inventory.save($scope.product);
        // Back up to the main view, convenience
        window.location = '#/products';
    };
    // Remove button handler, call the API to remove the product
    $scope.remove = function() {
        api.inventory.delete({ id: $scope.product.fields.itemId });
        // Back up to the main view, this view is invalid
        window.location = '#/products';
    };
}]);
