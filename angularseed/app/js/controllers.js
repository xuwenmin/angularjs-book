'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('Main',['$scope',function($scope){
   $scope.$on('$viewContentLoaded',function(){
      // console.log("Main-------viewContentLoaded..........");
   });
}]).
controller('MyCtrl1', ["$scope", "utilconfig", 'service1', 'service2', 'service3', '$window',
  function($scope, utilconfig, service1, service2, service3, $window) {
    $scope.constant = utilconfig.xuwm; //从constant中定义的常量服务中去取属性
    $scope.service1_v = service1.v; //service1 默认是返回[执行了function 的返回值]      用factory 定义的service,
    $scope.service2_v = service2.v; //service2 默认是angularjs执行new service2 返回一个以后一直用的实例   用service定义的service
    $scope.service3_v = service3.getstr(); //service3 默认是angularjs执行$get返回的obj
    $scope.numbers = [1, 2, 3, 4];
    $scope.isshow = true;
    $scope.test = function() {
      // $scope.$emit("demo.add");
      $scope.$broadcast("demo.add");
    };
    $scope.expanders = [{
      title: 'Click me to expand',
      text: 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
      title: 'Click this',
      text: 'I am even better text than you have seen previously'
    }, {
      title: 'Test',
      text: 'test'
    }];

    $scope.$on("demo.add", function() {
       console.log("parent.event.invoke.........");
    });

    // $scope.$broadcast是为了触发子节点设置的事件

  }
])
  .controller('Xuwm', ['$scope', '$window',
    function($scope, $window) {

      $scope.$on('demo.add',function(){
         console.log('child.event.invoke........');
      });
      // $scope.$emit是为了触发父节点设置的事件以及本身内设置的事件
      $scope.emitevent = function() {
        // $scope.$emit('parent.add');
        $scope.numbers = [3, 4];
        console.log($scope);
      }
    }
  ])
  .controller('MyCtrl2', ['$scope',
    function($scope) {
      //监控desc 属性，下面是不管输入什么，都只显示aaa
      var watch_desc = $scope.$watch("desc", function(newval, oldval, scope) {
        // console.log(newval);
      });
      $scope.stopdesc = function() {
        watch_desc();
      };
      $scope.gent = "man";
      $scope.args = [{
        name: 'xuwm',
        desc: 'this is a test!for angular',
        iscustomer: 'keyword'
      }, {
        name: 'tina',
        desc: 'admin is admin',
        iscustomer: 'at'
      }, {
        name: 'tina',
        desc: 'admin is admin',
        iscustomer: 'comment'
      }, {
        name: 'tina',
        desc: 'admin is admin',
        iscustomer: 'private'
      }];

      $scope.numbers = [{
        name: "1",
        desc: "fsdfsdf"
      }, {
        name: "2",
        desc: "fsdfsdf"
      }, {
        name: "3",
        desc: "fsdfsdf"
      }];
      $scope.$watch("numbers", function(newval, oldval, scope) {
        // console.log(arguments);
      });

      $scope.test2 = function(num, $element) {
        var p = $element.val().split(' ');
        num.name = p[0];
        num.desc = p[1];
        return;
      }

      $scope.test3 = function(num) {
         return num.name+" " +num.desc;
      }
    }
  ]);