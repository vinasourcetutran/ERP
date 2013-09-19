define(function () {
    var menus = [
            {
                //iconUrl: '/content/images/icon.png',
                id: 'coremenu1',
                url: 'coremenu1',
                name: 'core menu 1',
                index: 0,
                items: [{
                    //iconUrl:'/content/images/icon.png',
                    url: 'Core/home',
                    id: 'home',
                    name: 'Home',
                    index: 0,
                    moduleId: 'Core/viewmodels/home',
                    settings: {
                        moduleId: 'core'
                    }
                }, {
                    url: 'Core/details',
                    id: 'detail',
                    name: 'Detail',
                    index: 0,
                    moduleId: 'Core/viewmodels/details',
                    settings: {
                        moduleId: 'core'
                    }
                }]
            }, {
                id: 'coremenu2',
                url: 'coremenu2',
                name: 'Core menu 2',
                index: 1,
                items: []
            }
    ];
    return menus;
});