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

        storage.initialize(
            function () {
                var event = new Event('taskServiceInitialize');

                document.dispatchEvent(event);
            },
            function (e) {
                throw new Error(e.message);
            }
        );
    }

    function getList() {
        return storage.getList();
    }

    function createTask(value) {
        var task = new AppScope.Task();

        task.value = value;
        task.status = AppScope.TaskStatusEnum.ACTIVE_TASK;
        task.isChecked = false;

        return storage.createTask(task);
    }

    function getTask(id) {
        return storage.getTask(id);
    }

    function deleteTask(task) {
        return storage.deleteTask(task);
    }

    function markTaskAs(task, status) {
        task.status = status;
        return storage.updateTask(task);
    }

    function toggleTaskIsChecked(task) {
        task.isChecked = !task.isChecked;
        return storage.updateTask(task);
    }

    return {
        initialize: initialize,
        getList: getList,
        createTask: createTask,
        getTask: getTask,
        deleteTask: deleteTask,
        markTaskAs: markTaskAs,
        toggleTaskIsChecked: toggleTaskIsChecked
    }
})();