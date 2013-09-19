define(function () {
    var logger, vm = {
        activate: activate,
        title: 'Details View in core'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger = window.$inject.resolve('log');
        logger.info('Core Details View Activated');
        return true;
    }
    //#endregion
});