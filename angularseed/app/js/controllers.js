'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', ["$scope",
  function($scope) {

    $scope.isshow = true;
    $scope.test=function(){
      console.log($scope);
    };
    //监控desc 属性，下面是不管输入什么，都只显示aaa
   /* var watch_desc=$scope.$watch("desc",function(newval,oldval,scope){
       console.log(newval);
    });
    $scope.stopdesc=function(){
      watch_desc();
    };*/
    $scope.expanders = [
      {
        title: 'Click me to expand',
        text: 'Hi there folks, I am the content that was hidden but is now shown.'
      },
       {
        title: 'Click this',
        text: 'I am even better text than you have seen previously'
      }, 
      {
        title: 'Test',
        text: 'test'
      }
    ];

  }
])
  .controller('MyCtrl2', [
    function() {

    }
  ]);