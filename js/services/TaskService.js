if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskService = (function () {

    var storage;

    function initialize() {
        if (AppScope.config.storage == "serverApi") {
            storage = AppScope.ServerApi;
        } else {
            storage = AppScope.TaskLocalStorage;
        }
    }

    function getAll(onSuccess) {
        storage.getAll(onSuccess);
    }

    function createElement(value, onSuccess) {
        var el = new AppScope.Task();

        el.value = value;
        el.status = AppScope.TaskStatusEnum.ACTIVE_TASK;
        el.isChecked = false;

        storage.createElement(el, onSuccess);
    }

    function getElement(id, onSuccess) {
        storage.getElement(id, onSuccess);
    }

    function deleteElement(el, onSuccess) {
        storage.deleteElement(el, onSuccess);
    }

    function markAs(el, status, onSuccess) {
        el.status = status;
        storage.updateElement(el, onSuccess);
    }

    function toggleIsChecked(el, onSuccess) {
        el.isChecked = !el.isChecked;
        storage.updateElement(el, onSuccess);
    }

    return {
        initialize: initialize,
        getAll: getAll,
        createElement: createElement,
        getElement: getElement,
        deleteElement: deleteElement,
        markAs: markAs,
        toggleIsChecked: toggleIsChecked
    }
})();