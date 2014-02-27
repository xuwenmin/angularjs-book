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
controller('MyCtrl1', ["$scope", '$window', '$stateParams', '$parse', '$interval', '$q', '$state', 'service1',  
  function($scope, $window, $stateParams, $parse, $interval, $q, $state, service1) {

      angular.module('myApp').constant('feenan', {
        xuwm: "this is a test!"
      });

      console.log(angular.injector());

      console.log(angular.module('myApp'));
      service1.getData().then(function(msg){
          // console.log(msg);
      });

      var json = JSON.stringify( { id: 1, name: 'xuwm'} );

    
      var delayFn = function(){
          var delay = $q.defer();
          setTimeout(function() {
              delay.resolve('admin');
          }, 10);
          return delay.promise;
      }

      var ajaxFn = function(){
          if(--_i < 0) return;
          delayFn().then(function(msg){
              console.log(msg);
              actionFn(_i);
          });
      }
      var actionFn = function(){
          var _i = 4;
          var ajaxFn = function(){
              if(--_i < 0) {
                return;
              }
              delayFn().then(function(msg){
                  ajaxFn(_i);
              });
          }

          ajaxFn();

      }

      actionFn();


      $scope.replyList = [
          {
              title:'rom1',
              list:[
                  {
                      k:1,
                      v:'这是一个很好的方案.'
                  },
                  {
                      k:2,
                      v:'这是一个很好的方案.'
                  }
              ]
          },
          {
              title:'rom2',
              list:[
                  {
                      k:1,
                      v:'这是一个很好的问题.'
                  },
                  {
                      k:2,
                      v:'这是一个很好的问题.'
                  }
              ]
          },
          {
              title:'未分组',
              list:[]
          }
      ]

      $scope.textareaPara = {
          maxHeight: 220,
          minHeight: 30
      }

      //  表扬 建议 咨询 投诉 一般交流
      $scope.dropdownData = {
        data:[
          {
            k: 1,
            v: '表扬'
          }, {
            k: 2,
            v: '建议'
          }, {
            k: 3,
            v: '咨询'
          }, {
            k: 4,
            v: '投诉'
          }, {
            k: 5,
            v: '一般交流'
          }
        ],
        title: '标识'
      };
      $scope.clickDemo = function($event) {
        console.log($event);
      }

      // 下拉菜单回调
      $scope.dropdownFn = function() {
        console.log('fsdfsdf');
      }
      $scope.abc = 'admin';
      $scope.userName = 'xuwm';

      $scope.today = new Date();


      $interval(function() {
        $scope.today = new Date();
      }, 1000);

      $scope.$watch('exp', function(newVal, oldVal, scope) {
        if (newVal != oldVal) {
          var parseFn = $parse(newVal);
          $scope.parseValue = parseFn(scope);
        }
      });

      $scope.sortLists = [
          {
             id: 1,
             name: 'xuwm',
             age: 20
          }, 
          {
             id: 2,
             name: 'admin',
             age: 10
          }, 
          {
             id: 3,
             name: 'tina',
             age: 15
          }, 
          {
             id: 4,
             name: 'weibo',
             age: 30
          }
      ];

      $scope.parseDemo = function(){
          var parseFn = $parse('userName');
          console.log(parseFn($scope));
      }

      $scope.parseDemo();

  }
])
  .controller('MyCtrl2', ['$scope', '$q', '$timeout', '$location', '$interpolate', '$sce', '$exceptionHandler',
    function($scope, $q, $timeout, $location, $interpolate, $sce, $exceptionHandler) {

        $scope.showVal = 1;
        $scope.keydownFn = function(event){
            console.log(event.keyCode);
        }
        $scope.submitData = function(){
             console.log($scope.fileData);
        }

        

    }
  ]);