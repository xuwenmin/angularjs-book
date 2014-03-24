'use strict';


// Declare app level module which depends on filters, and services



var demoApp = angular.module('myApp', [
  'ngAnimate',
  'ui.router',
  'ui.event',
  'ui.format',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  // 'pasvaz.bindonce',
  //一个第三方的指令，用来绑定一次性的model, 不会增加watch,这样可以提高性能
  'smartUI'
]);
var smartUI = angular.module('smartUI',[]);
demoApp.config([ '$stateProvider', '$urlRouterProvider', 'service3Provider', '$provide' , '$httpProvider', 
  function($stateProvider, $urlRouterProvider, service3Provider, $provide, $httpProvider ) {

    // console.log($httpProvider);
    $httpProvider.interceptors.push(function($q, $rootScope) {
          return {
            // optional method
            'request': function(config) {
              // do something on success
              if(config.method == 'POST'){
                  // console.log(config, 'request start.........');
              }
              return config || $q.when(config);
            },
            // optional method
           'requestError': function(rejection) {
              // do something on error
              return $q.reject(rejection);
            },
            // optional method
            'response': function(response) {
                // do something on success
                if (response.config.method == 'POST'){
                    // console.log(response, 'response end.........');
                }
                return response || $q.when(response);
            },
            // optional method
           'responseError': function(rejection) {
              // do something on error
              return $q.reject(rejection);
            }
          };
      }
    );

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
            // console.log('enter myctrl1...');
          },
          data:{
            userName: '111',
            demo : '222'
          }
      })
      .state('index.view2', {
          url: '/view2',
          templateUrl: 'partials/partial2.html',
          controller: 'MyCtrl2',
          onEnter: function(){
            // console.log('enter myctrl2...');
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