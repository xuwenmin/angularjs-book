'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  //一个第三方的指令，用来绑定一次性的model, 不会增加watch,这样可以提高性能
  'pasvaz.bindonce' 
]).
config(['$routeProvider', 'service3Provider','$provide',function($routeProvider,service3Provider,$provide) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
  service3Provider.setstr("app config str !"); //只有用provider来定义的服务才能在config里进行调用

  //测试在config里增加已有服务实例的方法
  $provide.decorator('service3',function($delegate){
      $delegate.goodfn=function(){
          console.log("this is dynamic method! ");
      }
      return $delegate;
  });
}]).
//$location 服务是来控制路由的
run(['$rootScope','$location',function($rootScope,$location){
  $location.path('/view2');
}]);
