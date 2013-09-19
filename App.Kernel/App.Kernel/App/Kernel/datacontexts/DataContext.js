define(function () {

    var datacontext={
            logger: undefined,
            initialized: initialized
    }
    return datacontext;

    function initialized() {
        if (datacontext.logger) {
            datacontext.logger.info("DataContext was initialized");
        }
    }
});