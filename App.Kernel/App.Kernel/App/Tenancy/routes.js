define(function () {
    var routes = [
        {
            url: 'tenancy/index',
            visible:false,
            moduleId: 'tenancy/viewmodels/index',
            settings: {
                moduleId: 'tenancy'
            }
        }
    ];
    return routes;
});