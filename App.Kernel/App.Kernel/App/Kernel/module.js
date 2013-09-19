define(['Kernel/routes', 'Kernel/wireup', 'Kernel/menus'], function (routes, wireupInstance, menus) {
    var module, runtime, router, injector, logger;
    module = {
        init: init
    };

    return module;
    //module startup
    function init(runtimeObj, routerObj, injectorObj) {
        var moduleInfo;
        runtime = runtimeObj;
        router = routerObj;
        injector = injectorObj;
        moduleInfo = getModuleInfo();
        //register injection
        wireupInjection(injector);
        logger = injector.resolve("log");
        //module
        runtime.addModuleInstance(moduleInfo.id, module);

        runtime.registerModule(moduleInfo);
        //register route
        setRoutes(router);
        logger.info('init called');
    }

    function getModuleInfo() {
        var moduleInfo = {
            id: 'kernel',
            name: 'Kernel module',
            tooltip: 'Tooltip kernel module',
            defaultViewUrl: 'Kernel/viewmodels/index'
        };
        return moduleInfo;
    }

    function wireupInjection(injector) {
        wireupInstance.wireup(injector);
    }

    
    function getMainMenus() {
        return menus;
    }
   

    function setRoutes(router) {
        var routesFrommenu = [], routingService = injector.resolve('routingService');
        //convert from menu to route items
        routingService.getRoutesFromMenu(routesFrommenu, getMainMenus());
        //merge with routing items
        ko.utils.arrayPushAll(routesFrommenu, routes);
        // map all routes of Kernel module
        router.map(routesFrommenu);
        //router.map(routes);
        logger.info('Routing was done in Kernel module');
    }
});