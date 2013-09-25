define(function () {
    var logger, vm = {
        activate: activate,
        title: 'Settings / Accounts'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger = window.$inject.resolve('log');
    }
    //#endregion
});