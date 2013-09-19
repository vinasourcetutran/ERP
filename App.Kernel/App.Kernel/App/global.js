//define global variable that can be used any where in application
define(function () {
    var global,
        context=require("datacontext");
    global = {
        datacontext: context.getInstance()
    };
    return global;
});