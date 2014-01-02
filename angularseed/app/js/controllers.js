'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', ["$scope","utilconfig",'service1','service2','service3','$window',
  function($scope,utilconfig,service1,service2,service3,$window) {
      $scope.constant=utilconfig.xuwm; //从constant中定义的常量服务中去取属性
      $scope.service1_v=service1.v; //service1 默认是返回[执行了function 的返回值]      用factory 定义的service,
      $scope.service2_v=service2.v; //service2 默认是angularjs执行new service2 返回一个以后一直用的实例   用service定义的service
      $scope.service3_v=service3.getstr(); //service3 默认是angularjs执行$get返回的obj

      console.log(service3);

      $scope.isshow = true;
      $scope.test=function(){
         // $scope.$emit("demo.add");
         // $scope.$broadcast("demo.add");
      };
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

      $scope.$on("parent.add",function(){
          $scope.constant='demo emit';
      });

      // $scope.$broadcast是为了触发子节点设置的事件

  }
])
.controller('Xuwm',['$scope','$window',function($scope,$window){

    // $scope.$emit是为了触发父节点设置的事件以及本身内设置的事件
    $scope.emitevent=function(){
        $scope.$emit('parent.add');
    }
}])
.controller('MyCtrl2', ['$scope',
    function($scope) {
        //监控desc 属性，下面是不管输入什么，都只显示aaa
        var watch_desc=$scope.$watch("desc",function(newval,oldval,scope){
           console.log(newval);
        });
        $scope.stopdesc=function(){
          watch_desc();
        };
    }
]);