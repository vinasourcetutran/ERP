define(function () {
    var menus = [
            {
                id: 'kernel_setting',
                url: 'kernel/settings',
                name: 'Settings',
                index: 0,
                items: [{
                    url: 'Kernel/settings/accounts',
                    id: 'kernel_setting_account',
                    name: 'Accounts',
                    index: 0,
                    moduleId: 'Kernel/viewmodels/settings/accounts',
                    settings: {
                        moduleId: 'kernel'
                    }
                }, {
                    url: 'Kernel/settings/taxes',
                    id: 'kernel_setting_taxes',
                    name: 'Taxes',
                    index: 0,
                    moduleId: 'Kernel/viewmodels/settings/taxes',
                    settings: {
                        moduleId: 'kernel'
                    }
                }
                ]
            },
    ];
    return menus;
});