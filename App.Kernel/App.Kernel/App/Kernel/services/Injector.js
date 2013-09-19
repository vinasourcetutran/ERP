define(function () {
    var injector, dependency = {};
    injector = {
        register: register,
        resolve: resolve,
        remove: remove,
        removeAll: removeAll
    };
    return injector;

    function remove(id) {
        delete dependency[id];
    }

    function removeAll() {
        dependency = {};
    }
    function register(id, obj) {
        var id, obj;
        if (String.isNullOrWhiteSpace(id) || obj==undefined) {
            throw String.format('invalid arguments  when register {0}', id);
        }
        dependency[id] = obj;
    }

    function resolve(id) {
        var obj, func, resolvedDependency;
        if (!dependency[id]) {
            throw String.format('{0} was not registered', id);
        }
        var obj = dependency[id];
        if (typeof obj == 'function') {
            resolvedDependency = resolveDependencies(obj);
            //obj = getInstanceOfClass(obj, resolvedDependency);
            func = obj;
            obj = new func;
            func.apply(obj, resolvedDependency);
            //register new obj back
            register(id, obj);
        }
        return obj;
    }

    /*function getInstanceOfClass(construct, args) {
        function F() {
            return construct.apply(this, args);
        }
        F.prototype = construct.prototype;
        return new F();
    }*/

    function resolveDependencies(func) {
        var args = getArguments(func);
        var dependencies = [];
        for (var i = 0; i < args.length; i++) {
            dependencies.push(dependency[args[i]]);
        }
        return dependencies;
    }

    function getArguments(func) {
        //This regex is from require.js
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var args = func.toString().match(FN_ARGS)[1].split(',');
        return args;
    }
});