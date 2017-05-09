if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskService = (function () {

    var isInitialized,
        _storage,
        _data;

    function initialize() {
        if (!isInitialized) {
            if (AppScope.config.storage == "serverApi") {
                _storage = AppScope.ServerApi;
            } else {
                _storage = AppScope.TaskLocalStorage;
            }

            _storage.readData(
                function (data) {
                    isInitialized = true;
                    _data = data;

                    var event = new Event('taskServiceInitialize');
                    document.dispatchEvent(event);
                },
                function (e) {
                    throw new Error(e.message);
                }
            );
        }
    }

    function getList() {
        if (!isInitialized) {
            return;
        }

        return _data;
    }

    function createTask(task) {
        if (!isInitialized) {
            return;
        }

        var i = _data.length;

        task.isChanged = true;
        _data[i] = task;
        _storage.updateData(_data);

        return _data[i].id;
    }

    function getTask(id) {
        if (!isInitialized) {
            return;
        }

        for (var i = 0; i < _data.length; i++) {
            var task = _data[i];

            if (task.id === id) {
                return task;
            }
        }

        return null;
    }

    function updateTask(task) {
        if (!isInitialized) {
            return;
        }

        for (var i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data[i].isChanged = true;
                _storage.updateData(_data);

                return true;
            }
        }

        return false;
    }

    function deleteTask(task) {
        if (!isInitialized) {
            return;
        }

        for (var i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data[i].isDeleted = true;
                _storage.updateData(_data);

                return true;
            }
        }

        return false;
    }

    return {
        initialize: initialize,
        getList: getList,
        createTask: createTask,
        getTask: getTask,
        updateTask: updateTask,
        deleteTask: deleteTask
    }
})();