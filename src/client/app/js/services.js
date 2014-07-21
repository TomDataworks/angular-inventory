'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.

// While this is here as a trivial example, I've been using it to
// keep track of the version number of my application.
angular.module('myApp.services', []).
  value('version', '0.3');
