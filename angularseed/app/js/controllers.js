'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ["$scope",function($scope) {

  	$scope.name="xuwm";
  	$scope.isshow=true;

  	$scope.title = '点击展开';

    $scope.text = '这里是内部的内容。';

    $scope.expanders = [{
        title : 'Click me to expand',
        text : 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title : 'Click this',
        text : 'I am even better text than you have seen previously'
    }, {
        title : 'Test',
        text : 'test'
    }];

  }])
  .controller('MyCtrl2', [function() {

  }]);