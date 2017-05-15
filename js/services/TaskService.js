if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskService = (function () {
    var DomService = AppScope.DomService,
        _isInitialized,
        _storage,
        _data;

    function initialize(onSuccess) {
        if (!_isInitialized) {
            if (AppScope.config.storage == 'serverApi') {
                _storage = AppScope.ServerApi;
            } else {
                _storage = AppScope.TaskLocalStorage;
            }

            _storage.readData(
                function (data) {
                    _isInitialized = true;
                    _data = data;

                    onSuccess();
                },
                function (e) {
                    throw new Error(e.message);
                }
            );
        }
    }

    function getList() {
        if (!_isInitialized) {
            return;
        }

        return _data.slice(0);
    }

    function createTask(task) {
        if (!_isInitialized) {
            return;
        }

        var i = _data.length;

        _data[i] = task;
        _storage.updateData(_data);

        return _data[i].id;
    }

    function getTask(id) {
        if (!_isInitialized) {
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
        if (!_isInitialized) {
            return;
        }

        for (var i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data[i] = task;
                _storage.updateData(_data);

                return true;
            }
        }

        return false;
    }

    function deleteTask(task) {
        if (!_isInitialized) {
            return;
        }

        for (var i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data.splice(i, 1);
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