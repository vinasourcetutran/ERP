﻿define([
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
            /*var currentModuleId = router.activeRoute() && router.activeRoute().settings && router.activeRoute().settings.moduleId ? router.activeRoute().settings.moduleId : '';
            if (!String.isNullOrWhiteSpace(currentModuleId) && !runtime.currentSelectedModuleId().isEqual(currentModuleId)) {
                onModuleClicked(currentModuleId);
            }*/
            console.log("afterCompose:" + router.activeItem());
            return router.afterCompose();
        }
        //#object life cycle
        function activate() {
            console.log('inside shell');
            window.onresize = function () {
                setTimeout(refreshUI, 100);
            }
            //refreshUI();
            setTimeout(window.onresize, 200);
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
                //refreshUI();
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
            shell.moduleMenus(runtime.getModuleInstance(moduleId).getMainMenus());
            if (data.defaultViewUrl) {
                router.activate(data.defaultViewUrl);
            }

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
            console.log('inside refresh ui of shell');
            //$("#rightSide").accordion({ collapsible: true });
            //$('#content').height($(document).height()-60);
            //$(".accordion").collapse();
            setupLeftMenu();
            setSidebarHeight();
        }

        function setupLeftMenu() {
            console.log("setupLeftMenu");
            $("#section-menu").accordion().accordion("destroy");
            $("#section-menu").accordion({
                collapsible: true,
                heightStyle:'content'
            });
            /*$("#section-menu")
                .accordion({
                    "header": "a.menuitem"
                })
                .bind("accordionchangestart", function (e, data) {
                    data.newHeader.next().andSelf().addClass("current");
                    data.oldHeader.next().andSelf().removeClass("current");
                })
                .find("a.menuitem:first").addClass("current")
                .next().addClass("current");
                */
           // $('#section-menu .submenu').css('height', 'auto');
        }
        function setSidebarHeight() {
            setTimeout(function () {
                /*var height = $(document).height();
                console.log("document height:"+ height);
                $('#header, #nav').each(function () {
                    height -= $(this).outerHeight();
                    console.log(this.id + ":" + $(this).outerHeight());
                });
                //height -= 1;
                console.log("side menu height:" + height);
                //salert(height);
                $('.sidemenu').css('height', height);*/
                
                var nav = $('#nav'), height = $('#footer').offset().top - nav.offset().top - nav.height();

                runtime.mainContentBoxInnerHeight(height - 70);
                runtime.leftMenuHeight(height);

                $('.sidemenu').css('height', runtime.leftMenuHeight());
                $('#main-content-box-inner').css('height', runtime.mainContentBoxInnerHeight());
                
            }, 100);
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