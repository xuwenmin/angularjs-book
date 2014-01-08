'use strict';

/* Filters */

angular.module('myApp.filters', []).
 filter('tasktype', ['$scope',function () {
        return function (items) {
            return items;
        }
  }]).
  filter('allfilter',function(){
  	return function(input,para){
  		var result=input.split('').splice(3);
  		if(para){
  			result=result.join('').toUpperCase();
  		}
  		return result;
  	}
  }).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);
