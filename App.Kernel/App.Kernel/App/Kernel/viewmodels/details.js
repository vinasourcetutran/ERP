define(function () {
    var logger, vm = {
        activate: activate,
        title: 'Details View'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger = window.$inject.resolve('log');
        logger.info('Details View Activated');
    }
    //#endregion
});