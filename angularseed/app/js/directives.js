'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('tab',function(){
  	 return {
  	 	restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<div ng-transclude></div>',
        controller : function() {
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
  directive('expander',function(){
  	 return {
  		restrict:'EA',
  		scope : {
            title : '=expanderTitle'
        },
  		template : '<div class="demo">'
                 + '<div class="title" ng-click="toggle()">{{title}}</div>'
                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
                 + '</div>',
        replace: true,
        transclude:true,
        require : '^?tab',
        link : function(scope, element, attrs,tabController) {
            scope.showMe = false;
            tabController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                tabController.gotOpened(scope);
            }
        }
  	 };
  });
