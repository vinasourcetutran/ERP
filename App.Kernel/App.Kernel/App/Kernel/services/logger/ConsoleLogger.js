define(function () {
    var consoleLogger;
    consoleLogger = {
        info: info,
        error: error,
        warning: warning
    };
    return consoleLogger;

    function info(msg) {
        write(String.format("{0} - {1} - {2}", (new Date()).format("dd/mm/yy:hh:mm:ms"), "Information", msg));
    }

    function error(msg) {
        write(String.format("{0} - {1} - {2}", (new Date()).format("dd/mm/yy:hh:mm:ms"), "Error", msg));
    }

    function warning(msg) {
        write(String.format("{0} - {1} - {2}", (new Date()).format("dd/mm/yy:hh:mm:ms"), "Warning", msg));
    }

    function write(msg) {
        console.log(msg);
    }
});