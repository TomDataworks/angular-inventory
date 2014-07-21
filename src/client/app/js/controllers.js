'use strict';

/* Controllers */

var appControllers = angular.module('myApp.controllers', []);

appControllers.controller('authController', ['$scope', '$http', 'api', function($scope, $http, api) {
  // Angular does not detect auto-fill or auto-complete. If the browser
  // autofills "username", Angular will be unaware of this and think
  // the $scope.username is blank. To workaround this we use the 
  // autofill-event polyfill [4][5]
  $('#id_auth_form input').checkAndTriggerAutoFillEvent();

  // Here we create a simple web service, as this controller is loaded
  // every time the page is reloaded. We aren't using Django to parse
  // templates, so rather we check the login on a "new" load of the web
  // application.
  $http.get('/django/accounts/checklogin').success(function(data) {
    $scope.user = data.username;
  });
 
  // This just returns the credentials from the model
  $scope.getCredentials = function(){
    return {username: $scope.username, password: $scope.password};
  };

  // This allows logging in to the web service, throwing an error to the
  // user if we could not login.
  $scope.login = function(){
    api.auth.login($scope.getCredentials()).
      $promise.
         then(function(data){
           // on good username and password
           $scope.user = data.username;
         }).
         catch(function(data){
           // on incorrect username and password
           alert(data.data.detail);
         });
      };
 
      // This allows logging out from the web service, which just undefines
      // the user if the logout was successful.
      $scope.logout = function(){
        api.auth.logout(function(){
          $scope.user = undefined;
        });
      };

      // This would allow registration of a new user. We aren't going to
      // allow that, and just rely on Django admin panel or the manage.py
      // initial creation of the database.
      // $scope.register = function($event){
      //   prevent login form from firing
      //   $event.preventDefault();
      //   create user and immediatly login on success
      //   api.users.create($scope.getCredentials()).
      //   $promise.
      //     then($scope.login).
      //       catch(function(data){
      //         alert(data.data.username);
      //       });
      // };
}]);

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
        api.inventory.save($scope.product).
          $promise.
            then(function(data) {
              window.location = '#/products';
            }).
            catch(function(data) {
              $('#ErrorMessage').text("There was an error saving the data. (" + data.status + " " + data.statusText + ")");
              $scope.error = true;
            });
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
        api.inventory.save($scope.product).
          $promise.
            then(function(data) {
              // Back up to the main view, convenience
              window.location = '#/products';
            }).
            catch(function(data) {
              $('#ErrorMessage').text("There was an error saving the data. (" + data.status + " " + data.statusText + ")");
              $scope.error = true;
            });
    };
    // Remove button handler, call the API to remove the product
    $scope.remove = function() {
        api.inventory.delete({ id: $scope.product.fields.itemId }).
          $promise.
            then(function(data) {
              // Back up to the main view, this view is invalid (deleted)
              window.location = '#/products';
            }).
            catch(function(data) {
              $('#ErrorMessage').text("There was an error saving the data. (" + data.status + " " + data.statusText + ")");
              $scope.error = true;
            });
    };
}]);
