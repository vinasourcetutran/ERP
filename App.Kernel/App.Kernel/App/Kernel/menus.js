define(function () {
    var menus = [
            {
                id: 'kernelmenu1',
                url: 'kernelmenu1',
                name: 'kernel menu 1',
                index: 0,
                items: [{
                    url: 'Kernel/home',
                    id: 'home',
                    name: 'Home',
                    index: 0,
                    moduleId: 'Kernel/viewmodels/home',
                    settings: {
                        moduleId: 'kernel'
                    }
                }, {
                    url: 'Kernel/details',
                    id: 'detail',
                    name: 'Detail',
                    index: 0,
                    moduleId: 'Kernel/viewmodels/details',
                    settings: {
                        moduleId: 'kernel'
                    }
                }]
            }, {
                id: 'kernelmenu2',
                url: 'kernelmenu2',
                name: 'kernel menu 2',
                index: 1,
                items: []
            }
    ];
    return menus;
});