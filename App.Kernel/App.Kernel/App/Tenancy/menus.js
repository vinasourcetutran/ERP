define(function () {
    var menus = [
        {
            url: '',
            name: 'Client account',
            index: 0,
            items: [{
                url: 'tenancy/clientaccounts',
                name: 'Client accounts',
                index: 0,
                moduleId: 'tenancy/viewmodels/account/clientaccounts',
                settings: {
                    moduleId: 'tenancy'
                }
            }, {
                url: 'tenancy/organisations',
                name: 'Organisations',
                index: 0,
                moduleId: 'tenancy/viewmodels/organisation/organisations',
                settings: {
                    moduleId: 'tenancy'
                }
            }]
        },{
                url: '',
                name: 'Users',
                index: 0,
                items: [{
                    url: 'tenancy/users',
                    name: 'Users',
                    index: 0,
                    moduleId: 'tenancy/viewmodels/users/users',
                    settings: {
                        moduleId: 'tenancy'
                    }
                }, {
                    url: 'tenancy/usergroups',
                    name: 'User Groups',
                    index: 0,
                    moduleId: 'tenancy/viewmodels/users/usergroups',
                    settings: {
                        moduleId: 'tenancy'
                    }
                }, {
                    url: 'tenancy/roles',
                    name: 'Roles',
                    index: 0,
                    moduleId: 'tenancy/viewmodels/users/roles',
                    settings: {
                        moduleId: 'tenancy'
                    }
                }
                ]
            }
    ];
    return menus;
});