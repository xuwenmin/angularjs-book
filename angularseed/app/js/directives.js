'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('appVersion', ['version',
  function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }
]).
directive('showmsgdemo', [

  function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'showmsg.html'
    }
  }
]).
directive('showmsg', [

  function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'tmpl/a.html'
    }
  }
]).
directive('crmAdd', ['$window', '$compile',
  function($window, $compile) {
    var _html = '<showmsg></showmsg><showmsgdemo></showmsgdemo>';
    return {
      link: function(scope, elem, attrs) {
        elem.bind("click", function(e) {
          elem.parent().find("p").remove();
          elem.parent().append(_html);
          $compile(elem.parent())(scope);
          scope.$apply();
        });
      }
    }
  }
]).
directive('whenActive', function($location) {
  return {
    scope: true,
    link: function(scope, element, attrs) {
      scope.$on('$routeChangeSuccess', function() {
        var cur = "#" + $location.path();
        if (cur == element.attr('href')) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }
  }
}).
directive('getter', function($parse) {
  var link = function($scope, $element, $attrs, $ctrl) {
    var func = $parse($attrs['getter']);
    $scope.$watch(function() {
      $element.val(func($scope));
    });
  }
  return link;
}).
directive('setter', function($parse) {
  var link = function($scope, $element, $attrs, $ctrl) {
    var func = $parse($attrs['setter']);
    $element.on('change', function(eventObj) {
      func($scope, {
        $element: $element
      });
      $scope.$digest();
    });
  }
  return link;
}).
directive('tab', function() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function($scope, $element, $attrs, $transclude) {
      var expanders = [];
      this.gotOpened = function(selectedExpander) {
        angular.forEach(expanders, function(expander) {
          if (selectedExpander != expander) {
            expander.showMe = false;
          }
        });
      }
      this.addExpander = function(expander) {
        expanders.push(expander);
      }
    }
  }
}).
directive('expander', function() {
  return {
    restrict: 'EA',
    scope: {
      title: '=expanderTitle'
    },
    template: '<div class="demo">' + '<div class="title" ng-click="toggle()">{{title}}</div>' + '<div class="body" ng-show="showMe" ng-transclude></div>' + '</div>',
    replace: true,
    transclude: true,
    require: '^?tab',
    link: function(scope, element, attrs, tabController) {
      // console.log(tabController);
      console.log(scope);
      scope.showMe = false;
      // console.log(tabController);
      tabController.addExpander(scope);
      scope.toggle = function toggle() {
        scope.showMe = !scope.showMe;
        tabController.gotOpened(scope);
      }
    }
  };
})
  .directive('smartInteger', function() {
    var INTEGER_REGEXP = /^\-?\d*$/;
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        ctrl.$parsers.unshift(function(viewValue) {

          if (INTEGER_REGEXP.test(viewValue)) {
            // it is valid
            ctrl.$setValidity('integer', true);

            return viewValue;
          } else {
            // it is invalid, return undefined (no model update)
            ctrl.$setValidity('integer', false);
            return 0;
          }
        });
      }
    };
  })
  .directive('smartFloat', function() {
    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        // console.log(elm);
        ctrl.$parsers.unshift(function(viewValue) {

          if (FLOAT_REGEXP.test(viewValue)) {
            ctrl.$setValidity('float', true);
            return parseFloat(viewValue.replace(',', '.'));
          } else {
            ctrl.$setValidity('float', false);
            return undefined;
          }
        });
      }
    };
  })
  .directive('pageBlock', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'tmpl/pageinfo.html',
        scope: {
          pageDatas: '=',
          pageCallback: '='
        },
        controller: function($scope, $element, $attrs, $transclude) {

          var init = function() {
            $scope.pages = [];
            for (var i = 1; i <= $scope.pageDatas.count; i++) {
              $scope.pages.push(i);
            }
            $scope.pagecount = $scope.pages.length;
            $scope.curpage = 1;
          };

          var callback = function() {
            $scope.pageCallback($scope.curpage);
          };

          init();

          $scope.$watch('pageDatas', function(newval, oldval) {
            init();
          });

          $scope.isActive = function(page) {
            return page == $scope.curpage;
          };

          $scope.selectPage = function(page) {
            $scope.curpage = page;
            callback();
          };

          $scope.selectPrevious = function(page) {
            if ($scope.curpage == 1) return;
            $scope.curpage = $scope.curpage - 1;
            if ($scope.curpage <= 0) {
              $scope.curpage = 1;
            }
            callback();
          };

          $scope.selectNext = function(page) {
            if ($scope.curpage == $scope.pagecount) return;
            $scope.curpage = $scope.curpage + 1;
            $scope.curpage = $scope.curpage > $scope.pagecount ? $scope.pagecount : $scope.curpage;
            callback();
          };

          // 检查是否可以上一页
          $scope.noPrevious = function() {
            if ($scope.curpage == 1) {
              return true;
            } else {
              return false;
            }
          }

           // 检查是否可以下一页
          $scope.noNext = function() {
            if ($scope.curpage == $scope.pagecount) {
              return true;
            } else {
              return false;
            }
          }

        },
        link: function(scope, element, attrs) {}
      }
    }
  ])
  .directive('alert' , ['$compile',function($compile){
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        // terminal: true,
        scope: {
          type: '=',
          close: '&',
          alert: '='
        },
        template: 
          '<div class="alert alert-{{type}}">' +
          '<button type="button" class="close"' +
          'ng-click="close()">&times;' +
          '</button>' +
          '<div ng-transclude></div>' +
          '</div>',
        controller: function($scope, $element, $transclude){
            // console.log($transclude());
        },
        compile: function (element, attrs, transcludeFn){
          return function postLinkFn(scope, element, attrs, controller){
              // element.find('div').empty().append(transcludeFn(scope));
              // var newScope = scope.$parent.$new();
              // var obj = transcludeFn(scope).clone();
              transcludeFn(scope, function(clone){
                  element.find('div').empty().append(clone);
              });
          }
        }
    }
  }])
  .directive('if',function(){
    return {
        restrict: 'EA',
        transclude: 'element',
        priority: 500,
        compile: function(element, attrs, transclude){
            return {
               pre: function preLink(scope, element, attrs){
               },
               post: function postLink(scope, element, attrs){
                  var childScopse,childElement;
                  scope.$watch(attrs['if'], function(){
                      if(childElement){
                          childElement.remove();
                          childScopse.$destroy();
                          childScopse = null;
                          childElement = null;
                      }else{
                          childScopse = scope.$new();
                          childElement = transclude(childScopse, function(clone){
                                element.after(clone);
                          });
                      }
                  });

                  // console.log(element.inheritedData());
               }
            }
        }

    }
  })
  .directive('demoRequire',['$compile',function($compile){
    return {
       restrict: 'EA',
       require:'^ngModel',
       controller: function($scope, $element, $attrs, $transclude){

       },
       link:function(scope,element,attrs,ctrl){
          // $setViewValue --->$parsers--->$scope--->$formatters--->$render--->View
          ctrl.$formatters.unshift(function(viewValue){
            return viewValue;
          });
          ctrl.$parsers.unshift(function(viewValue){
             // console.log('$parser.....');
             return viewValue;
          });

          ctrl.$render = function(e){
             // element.val('adminaaa');
             ctrl.$setViewValue(ctrl.$viewValue);
          }

       }
    }
  }]);