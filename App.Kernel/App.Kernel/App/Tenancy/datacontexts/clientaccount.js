﻿define(['Kernel/datacontexts/DataContext'], function (datacontext) {
    var dataContext = {
        initialize: function (log) {
            datacontext.logger = log;
            datacontext.initialized();
        },
        getUsers: function () {
            return [{
                userId: 1,
                name: 'name 2'
            }];
        }
    }
    return function (log) {
        dataContext.initialize(log);
        return dataContext;
    }
});
/*define(['Kernel/datacontexts/DataContext'], function (datacontext) {
    var testdatacontext, logger;
    testdatacontext = {
        initialized:initialized,
        getUsers: getUsers
    };
    return function (log) {
        initialized(log);
        return testdatacontext;
    };
    function initialized(log) {
        logger = log;
        datacontext.setLogger(log);
    }

    function getUsers() {
        datacontext.initialize();
        logger.info("Inside getUsers of testdatacontext class");
        return [{
            userId: 1,
            name:'Name 1'
        }];
    }
});*/