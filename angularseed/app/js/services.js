'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
// 用constant 来定义的服务是一个包含一些指令或者控制器中不变的东西，返回的一个obj
constant('utilconfig', {
	xuwm: "this is a test!"
}).
//用factory 来定义的服务是，先执行函数，返回一个包含基本值或者对象的obj
factory('service1', function() {
	var _abc = 'abc';
	var _getabc = function() {
		return _abc;
	}
	// console.log("invoke service1...........");
	return {
		v: 'test',
		getabc: _getabc
	};
}).
// 用service来定义的服务是一个构造函数，注入到控制器或者指令中的时候，是先new一下这个服务，返回一个单例实例
service('service2', function() {
	var thisIsPrivate = "Private";
	this.v = "This is public";
	// console.log("invoke service2...........");
	this.getPrivate = function() {
		return thisIsPrivate;
	};
}).
// 用provider来定义的服务是调用函数的$get函数来返回一个obj,这种服务可以在config中进行配置,比如可以调用setstr方法来修改私有变量
provider('service3',function(){
	var _str="xuwm";
	return {
		setstr:function(str){
			_str=str;
		},
		$get:function(){
			// console.log("invoke service3...........");
			var _getstr=function(){
				return _str;
			};
			return {
				getstr:_getstr,
				v:"abc"
			}
		}
	}
}).
value('version', '0.1');

/*var injector=angular.injector('myApp.services');
console.log(injector.get('service1'));*/