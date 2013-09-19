define(function () {
    var defaultLogger;
    defaultLogger = {
        info: info,
        error: error,
        warning: warning
    };
    return defaultLogger;

    function info(msg) {
        var title = String.format("{0} - {1}", new Date().format('dd/mm/yy:hh:ss:ms'), "Information");
        toastr.info(msg,title);
    }

    function error(msg) {
        var title = String.format("{0} - {1}", new Date().format('dd/mm/yy:hh:ss:ms'), "Error");
        toastr.error(msg, title);
    }

    function warning(msg) {
        var title = String.format("{0} - {1}", new Date().format('dd/mm/yy:hh:ss:ms'), "Warning");
        toastr.warning(msg, title);
    }
});