define(function () {
    var srv;
    function service2(service) {
        srv = service;
    }

    service2.prototype = {
        showAlert: function () {
            srv.alert();
        }
    }

    return service2;
});