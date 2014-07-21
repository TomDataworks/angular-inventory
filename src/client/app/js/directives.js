'use strict';

/* Directives */

// Application directive for app version, just here as a placeholder
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
