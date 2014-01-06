'use strict';

/* Filters */

angular.module('myApp.filters', []).
 filter('tasktype', ['$scope',function () {
        return function (items) {
            return items;
        }
  }]).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);
