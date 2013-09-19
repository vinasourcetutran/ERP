define(function () {
    var logger, datacontext, vm = {
        activate: activate,
        title: 'Home View'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger = window.$inject.resolve('log');
        datacontext = window.$inject.resolve('testdatacontext');

        logger.info('Home View Activated');
        var users = datacontext.getUsers();
        logger.info(String.format('user name:{0}', users[0].name));
    }
    //#endregion
});