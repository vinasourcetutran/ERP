define([
    'kernel/services/logger/DefaultLogger',
    'Kernel/datacontexts/TestDataContext',
    'Kernel/services/LanguageService',
    'Kernel/services/RoutingService'
],
function (logger, testDataContext, languageService, routingService) {
    var wireup;
    wireup = {
        wireup: wireup
    };
    return wireup;
    //wireup common used alias, such as: logger
    function wireup(injector) {
        // logging object
        injector.register('log', logger);
        injector.register('testdatacontext', testDataContext);
        injector.register('languageService', languageService);
        injector.register('routingService', routingService);
    }
});