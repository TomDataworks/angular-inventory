'use strict';

/* Filters */

// Example interpolate filter, just here as a placeholder and
// a template.
angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
