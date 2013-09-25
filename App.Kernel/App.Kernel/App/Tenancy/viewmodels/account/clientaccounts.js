define(function () {
    var logger, vm = {
        activate: activate,
        title:'Client account / Accounts'
    };

    return vm;

    //#region Internal Methods
    function activate() {
        $('.datatable').dataTable();
    }
    //#endregion
});