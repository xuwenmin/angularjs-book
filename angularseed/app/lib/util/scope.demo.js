var Scope = function(){
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listerFn){
    var watcher = {
        watchFn: watchFn,
        linster: listerFn
    };
    this.$$watchers.push(watcher);
}

Scope.prototype.$digest = function(){
    var dirty;
    do{
        dirty = this.$$digestOnce();
    }while(dirty)
}

Scope.prototype.$$digestOnce = function(){
    var self = this;
    var dirty;
    _.forEach(self.$$watchers, function(watcher){
        var newVal = watcher.watchFn();
        if (newVal != watcher.lastVal){
            watcher.linster(newVal, watcher.lastVal, self);
            dirty = true;
            watcher.lastVal = newVal;
        }
    })
    return dirty;
}

var scope = new Scope();

scope.firstName = 'xuwm';
scope.count = 0;

scope.$watch(function(){
    return scope.firstName;
}, function(newVal, oldVal, obj){
    console.log('this is invoke $digest,newVal:%s,oldVal:%s', newVal, oldVal);
});

scope.$watch(function(){
    return scope.count;
}, function(newVal, oldVal, obj){
    console.log('this is invoke $digest,newVal:%s,oldVal:%s', newVal, oldVal);
});


scope.$digest();

