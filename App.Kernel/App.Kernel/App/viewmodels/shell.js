define([
    'durandal/system',
    'durandal/plugins/router',
    'Kernel/services/logger',
    'config',
    'runtime',
    'Kernel/services/LanguageService'
],
    function (system, router, logger, config, runtime, languageService) {
        var log, shell = {
            router: router,
            //list of main menu (right menu) of selected module. see runtime.moduleMenus
            moduleMenus: ko.observableArray([]),
            //name of application. see config.appName
            appName: config.appName,
            //icon of application. see config.appIcon
            appIcon: config.appIcon,
            //list of registerd module. see runtime.modules
            modules: runtime.modules,
            //true if data of new module is loading
            isModuleChanging: ko.observable(false),
            //called when activated
            activate: activate,
            //current selected view
            currentView:ko.observable(''),
            //called when user click to change to new module
            onModuleClicked: onModuleClicked,
            afterCompose: afterCompose,
            activeModuleDefaultView: ko.observable()
        };
        
        return shell;

        //#region Internal Methods
        function afterCompose(parent, newChild, settings) {
            /*var currentModuleId = router.activeRoute().settings || router.activeRoute().settings.moduleId ? router.activeRoute().settings.moduleId : '';
            if (!String.isNullOrWhiteSpace(currentModuleId) && !runtime.currentSelectedModuleId().isEqual(currentModuleId)) {
                onModuleClicked(currentModuleId);
            }*/
            return router.afterCompose();
        }
        //#object life cycle
        function activate() {
            console.log('inside shell');
            //get reference to logger
            //log = window.$inject.resolve('log');

            //window.$inject.resolve('service2').showAlert();
            //window.$inject.resolve('service2').showAlert();
            return moduleBootstrap().then(function () {
                //console.log('bootstrap completed');
                //log.info("Bootstrap complete");
                //router to default page after configuring all modules
                //console.log("Activate default page url:" + config.defaultUrl);
                //log.info(String.format("Activate default page url:{0}", config.defaultUrl));
                //languageService.setLanguage('en', config.modules).then(function () {
                //    console.log(languageService.resolve('en','core','ok'));
                //});
                //shell.activeModule = router.activeItem;
                return router.activate(config.defaultUrl);
                //return true;
            });
        }
        //#event
        function onModuleClicked(moduleId) {
            console.log("onModuleClicked:"+ moduleId);
            var data = this, currentActiveModule;
            moduleId = data.id ? data.id : moduleId;

            //show loading icon
            shell.isModuleChanging(true);

            
            //inactive current module if found
            if (!String.isNullOrWhiteSpace(runtime.currentSelectedModuleId())) {
                runtime.getModule(runtime.currentSelectedModuleId()).isActive(false);
            }
            //active new module and update currentSelectedModuleId to new selected module Id
            currentActiveModule = runtime.getModule(moduleId);
            shell.activeModuleDefaultView(currentActiveModule.defaultViewUrl);
            runtime.getModule(moduleId).isActive(true);
            runtime.currentSelectedModuleId(moduleId);
            //update menu items appripriated with new selected module
            //shell.moduleMenus(runtime.getModuleInstance(moduleId).getMainMenus());


            //hide loading icon
            shell.isModuleChanging(false);
            //$("#rightSide").accordion({ collapsible: true });
            refreshUI();
        }

        /*function activeSelectedModule(module) {
            var model = {
                caption: module.name,
                hash: String.format("#/{0}/index",module.id),
                moduleId: module.defaultUrl,
                name: module.name,
                url: String.format("{0}/index", module.id),
                visible: false
            };
            router.activeRoute();
            return router.activeItem;
        }*/
        //update layout base on new data
        function refreshUI() {
            //log.info('inside refresh ui of shell');
            //$("#rightSide").accordion({ collapsible: true });
            $('#content').height($(document).height()-60);
            $(".accordion").collapse();

        }

        //private methods
        //bootstrap all configuration modules
        function moduleBootstrap() {
            //log.info('load modules boostrap.');
            var boostraps = [], defer=$.Deferred();
            config.modules.forEach(function (module, index) {
                boostraps.push(String.format("{0}/{1}",module,'module'));
            });
            //loop throught each bootstrap item. call init method of each
            require(boostraps, function () {
                var responses = arguments;
                ko.utils.arrayForEach(responses, function (module, index) {
                    //var moduleInfo = module.getModuleInfo();
                    //wireup dependency
                    /*module.wireupInjection(window.$inject);

                    runtime.addModuleInstance(moduleInfo.id, module);
                    runtime.registerModule(moduleInfo);*/
                    module.init(runtime, router, window.$inject);
                });
                //router to default page after configuring all modules
                //router.activate(config.defaultUrl);
                defer.resolve();
            });
            return defer;
        }
    });