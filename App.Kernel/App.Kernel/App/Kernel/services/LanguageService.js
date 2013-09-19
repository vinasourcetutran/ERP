define(function () {
    var resourceData = {}, languageService;
    languageService = {
        //get and text appropriated with resource
        resolve: resolve,
        setLanguage: setLanguage
    };
    return languageService;

    function setLanguage(languageCode, modules) {
        languageCode = languageCode.toLowerCase();
        var defer = $.Deferred(), resources;
        if (resourceData[languageCode]) {
            defer.resolve();
        } else {

            resources = getLanguageResourceToLoad(languageCode, modules);
            require(resources, function () {
                var resourceLanguages = arguments;
                modules.forEach(function (module, index) {
                    resourceData[String.format('{0}_{1}', languageCode, module.toLowerCase())] = resourceLanguages[index];
                });
                defer.resolve();
            });
        }
        return defer;
    }

    function getLanguageResourceToLoad(languageCode, modules) {
        var results = [];
        ko.utils.arrayForEach(modules, function (module) {
            results.push(String.format("{0}/languages/resource_{1}", module, languageCode));
        });
        return results;
    }
    function resolve(language, module, key) {
        var tmpKey = String.format('{0}_{1}', language, module).toLowerCase();
        module = module.toLowerCase();
        key = key.toLowerCase();

        if (!resourceData[tmpKey] || !resourceData[tmpKey][key]) {
            throw String.format("Invalid key: {0}/{1}/{2}", language, module, key);
        }
        return resourceData[tmpKey][key];
    }
});