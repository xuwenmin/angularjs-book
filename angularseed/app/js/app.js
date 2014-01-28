'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.router',
  'ui.event',
  'ui.format',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  //一个第三方的指令，用来绑定一次性的model, 不会增加watch,这样可以提高性能
  'pasvaz.bindonce'
]).
config([ '$stateProvider', '$urlRouterProvider', 'service3Provider', '$provide' ,
  function($stateProvider, $urlRouterProvider, service3Provider, $provide ) {

    $stateProvider
      .state('index', {
          abstract: true,
          url: '/index',
          template: '<div ui-view></div>'
      })
      .state('index.view1', {
          url: '/view1/:userId/message/{sortId}?from&to',
          templateUrl: 'partials/partial1.html',
          controller: 'MyCtrl1',
          onEnter: function(){
            console.log('enter myctrl1...');
          },
          data:{
            userName: 'xuwm',
            demo : 'admin'
          }
      })
      .state('index.view2', {
          url: '/view2',
          templateUrl: 'partials/partial2.html',
          controller: 'MyCtrl2',
          onEnter: function(){
            console.log('enter myctrl2...');
          }
    });


    $urlRouterProvider.when('', '/index/view2').
        otherwise('/index/view2');
  }
]).
//$location 服务是来控制路由的
run(['$rootScope', '$location', '$window', '$templateCache', '$timeout',
  function($rootScope, $location, $window, $templateCache, $timeout) {
    // console.log($templateCache);
    $rootScope.isshow = false;
    // $location.path('/view2');
    $rootScope.$on('$routeChangeStart', function() {

      $rootScope.isshow = true;
    });
    $rootScope.$on('$viewContentLoaded', function() {
      // $window.alert("end........");
      $rootScope.isshow = false;
    });

    $rootScope.disableBut = true;

    $timeout(function(){
      $rootScope.disableBut = false;
    }, 2000);

   

  }
]);