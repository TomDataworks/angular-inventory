'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

// This HTTP Interceptor changes the URL of a request, making sure
// that _every_ /django request gets a trailing slash.
myApp.factory('myHttpInterceptor', ['$q', function ($q) {
    return {
        'request': function(config) {
            // Make sure only /django/ requests get altered, and also
            // make sure it only happens when there is no trailing slash.
            if (config.url.indexOf('/django/') != -1 && config.url.slice(-1) != '/') {
                config.url += '/';
            }
            return config || $q.when(config);
        }
    };
}]);

// This HTTP Provider configuration just pushes the interceptor we
// just created.
myApp.config(['$httpProvider', function($httpProvider) {
    // Add the interceptor to the provider
    $httpProvider.interceptors.push('myHttpInterceptor');
}]);

// The route provider determines what controller to use when a certain
// URL is specified
myApp.config(['$routeProvider', function($routeProvider) {
  // The products route, displays the product index partial
  $routeProvider.when('/products', {templateUrl: 'partials/products.html', controller: 'ProductController'});
  // The products/:id route, displays the product details partial
  $routeProvider.when('/products/:id', {templateUrl: 'partials/product-details.html', controller: 'ProductDetailsController'});
  // The product/add route, displays the add product partial
  $routeProvider.when('/product/add', {templateUrl: 'partials/add-product.html', controller: 'ProductControllerAdd'});
  // Redirect to the /products route, thus the product index partial
  $routeProvider.otherwise({redirectTo: '/products'});
}]);

// Here we define the authentication system
// This is the source for the integration code:
// http://richardtier.com/2014/03/15/authenticate-using-django-rest-framework-endpoint-and-angularjs/
 
// [1] https://tools.ietf.org/html/rfc2617
// [2] https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
// [3] https://docs.djangoproject.com/en/dev/ref/settings/#append-slash
// [4] https://github.com/tbosch/autofill-event
// [5] http://remysharp.com/2010/10/08/what-is-a-polyfill/

// Add some configuration to the http provider to make sure that Cross-Site
// Request Forgery parameters are set.
myApp.config(['$httpProvider', function($httpProvider){
  // django and angular both support csrf tokens. This tells
  // angular which cookie to add to what header.
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

// Define the API, which consists of auth, users, and inventory
myApp.factory('api', ['$resource', function($resource){
  // Add the Authorization header to the request to the Auth API
  function add_auth_header(data, headersGetter){
    // as per HTTP authentication spec [1], credentials must be
    // encoded in base64. Lets use window.btoa [2]
    var headers = headersGetter();
    headers['Authorization'] = ('Basic ' + btoa(data.username +
                                        ':' + data.password));
  }
  // defining the endpoints. Note we escape url trailing dashes: Angular
  // strips unescaped trailing slashes. Problem as Django redirects urls
  // not ending in slashes to url that ends in slash for SEO reasons, unless
  // we tell Django not to [3]. This is a problem as the POST data cannot
  // be sent with the redirect. So we want Angular to not strip the slashes!
  return {
    // Authentication endpoint
    auth: $resource('/django/accounts/auth/', {}, {
      // Login must be transformed to add the Authorization header
      login: {method: 'POST', transformRequest: add_auth_header},
      logout: {method: 'DELETE'}
    }, {}),
    // Users endpoint
    users: $resource('/django/accounts/users/', {}, {
      create: {method: 'POST'}
    }, {}),
    // Inventory endpoint, this is just standard Angular web service
    inventory: $resource('/django/inventory/:id/')
  };
}]);
