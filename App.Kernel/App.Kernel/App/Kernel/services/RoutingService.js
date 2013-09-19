define(function () {
    var injector, routingService;
    routingService = {
        getRoutesFromMenu: getRoutesFromMenu
    };
    return routingService;
    //convert list of menus item to routing items
    function getRoutesFromMenu(results, menus) {
        ko.utils.arrayForEach(menus, function (menu) {
            var route;
            if (!String.isNullOrWhiteSpace(menu.url) && !String.isNullOrWhiteSpace(menu.moduleId)) {
                route = {
                    url: menu.url,
                    moduleId: menu.moduleId,
                    visible: false,
                    settings: menu.settings
                };
                results.push(route);
            }

            if (menu.items && menu.items.length) {
                getRoutesFromMenu(results, menu.items);
            }
        });

    }
});