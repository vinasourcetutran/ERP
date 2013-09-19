/*define list of objects that can be change during runtime
userProfile: contain information about current user:
- user: personal user information
- language: selected language of current user
- format:  all information related to data time format, currency, number. this informaiton may be used for data formatting
...
*/
define(function () {
    var runtime,
        userProfile = {
            user: ko.observable(),
            language: ko.observable(),
            format: ko.observable()
        },
        /*
        array of registerd modules:[{
            id, name, tooltip, isActive
        }]
        */
        modules = ko.observableArray([]),
        /*
        object holds all reference to instance of registered modules.
        {
        'module1':'module instance'
        }
        */
        moduleInstances = {},
        //current selected module id
        currentSelectedModuleId = ko.observable(''),
        moduleMenus = {};

    runtime = {
        currentSelectedModuleId: currentSelectedModuleId,
        modules: modules,
        moduleInstances: moduleInstances,
        moduleMenus: moduleMenus,
        //methods
        getModule:getModule,
        getModuleMenus: getModuleMenus,
        registerModule: registerModule,
        addModuleInstance: addModuleInstance,
        getModuleInstance: getModuleInstance
    };
    return runtime;
    function addModuleInstance(id, module) {
        moduleInstances[id.toString().toLowerCase()] = module;
    }

    function getModuleInstance(id) {
        return moduleInstances[id.toString().toLowerCase()];
    }
    //get reference to module info by module id
    function getModule(moduleId) {
        return ko.utils.arrayFirst(modules(), function (module) {
            return moduleId.isEqual(module.id);
        });
    }
    //register an module into the list of registered module
    function registerModule(moduleInfo) {
        var registerModule = {
            id: moduleInfo.id,
            name: moduleInfo.name,
            tooltip: moduleInfo.tooltip,
            isActive: ko.observable(false),
            defaultViewUrl: moduleInfo.defaultViewUrl
        };
        /*
        {
        caption:'',
        hash:'',
        moduleId:'',
        name:'',
        url:'',
        visible:false
        }
        */
        modules.push(registerModule);
    }

    //return main menu of module
    function getModuleMenus(moduleId) {
        var module = moduleInstances[moduleId];
        return module ? module.getMainMenus() : [];
    }
});