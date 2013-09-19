define(function () {
    var logger, vm = {
        activate: activate,
        title: 'Home View in core'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger = window.$inject.resolve('log');
        logger.info('Core Home View Activated');
        return true;
    }
    //#endregion
});