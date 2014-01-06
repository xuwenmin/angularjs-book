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
directive('showmsgdemo',[function(){
   return {
       restrict: 'EA',
       replace: true,
       templateUrl:'showmsg.html'
    }
}]).
directive('showmsg',[function(){
     return {
         restrict: 'EA',
         replace: true,
         templateUrl:'tmpl/a.html'
     }
}]).
directive('crmAdd',['$window','$compile',function($window,$compile){
  var _html='<showmsg></showmsg><showmsgdemo></showmsgdemo>';
  return {
    link:function(scope,elem,attrs){
        elem.bind("click",function(e){
            elem.parent().find("p").remove();
            elem.parent().append(_html);
            $compile(elem.parent())(scope);
            scope.$apply();
        });
    }
  }
}]).
directive('whenActive',function($location){
   return {
       scope: true,
       link: function (scope, element, attrs ) {
           scope.$on('$routeChangeSuccess', function () {
            var cur="#"+$location.path();
               if ( cur == element.attr( 'href' ) ) {
                   element.addClass( 'active' );
               }
               else {
                   element.removeClass( 'active' );
               }
           });
       }
   }
}).
directive('getter', function($parse){
  var link = function($scope, $element, $attrs, $ctrl){
     var func = $parse($attrs['getter']);
     $scope.$watch(function(){
        $element.val(func($scope));
     });
  }
  return link;
}).
directive('setter', function($parse){
  var link = function($scope, $element, $attrs, $ctrl){
    var func = $parse($attrs['setter']);
    $element.on('change', function(eventObj){
      func($scope, {$element: $element});
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
    controller: function($scope,$element,$attrs,$transclude) {
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
        scope.showMe = false;
        tabController.addExpander(scope);
        scope.toggle = function toggle() {
          scope.showMe = !scope.showMe;
          tabController.gotOpened(scope);
        }
    }
  };
});