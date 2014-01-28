'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('Main', ['$scope',
  function($scope) {

  }
]).
controller('MyCtrl3', ['$scope',
  function($scope) {

    console.log('start load MyCtrl3 controller.........');

  }
]).
controller('MyCtrl1', ["$scope", '$window', '$stateParams', 
  function($scope, $window, $stateParams) {

      $scope.userName = 'xuwm';
      $scope.$evalAsync('userName = "admin" ');

      $scope.user = {
          age: 10,
          gender: 'm'
      }
      $scope.showMsg = function(){
          console.log($scope.userName);
      }

      $scope.showFocus = function(e){
          
      }

      console.log($scope.$eval('{ name: userName }'));

  }
])
.controller('Xuwm', ['$scope', '$window',
  function($scope, $window) {


  }
])
  .controller('Controller', ['$scope', '$log',
    function($scope, $log) {

    }
  ])
  .controller('MyCtrl2', ['$scope', '$q', '$timeout', '$location', '$interpolate', '$sce', '$exceptionHandler',
    function($scope, $q, $timeout, $location, $interpolate, $sce, $exceptionHandler) {


    }
  ]);