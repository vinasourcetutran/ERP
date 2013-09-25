define(['tenancy/routes', 'tenancy/wireup', 'tenancy/menus'], function (routes, wireupInstance, menus) {
    var module, runtime, router, injector, logger, moduleName='security';
    module = {
        init: init,
        getMainMenus: getMainMenus
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
        logger.info('tenancy was initialized');
    }

    function getModuleInfo() {
        var moduleInfo = {
            id: 'tenancy',
            name: 'Tenancy',
            tooltip: 'tenancy modules',
            defaultViewUrl: 'tenancy/index'
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
        logger.info('Routing was done in tenancy module');
    }
});