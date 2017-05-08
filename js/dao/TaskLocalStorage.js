if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskLocalStorage = (function () {

    var TASKS_KEY = AppScope.localStorageConstants.TASK_LIST,
        Task = AppScope.Task;

    // List Cache
    var _data;

    function initialize(onSuccess, onError) {
        _readData(onSuccess, onError);
    }

    function getList() {
        return _data;
    }

    function updateList(list) {
        _data = list;
        _updateData();

        return _data;
    }

    function createTask(task) {
        task.id = '_' + Math.random().toString(36).substr(2, 9);

        _data.push(task);
        _updateData();

        return task;
    }

    function getTask(id) {
        for (var i = 0; i < _data.length; i++) {
            var task = _data[i];

            if (task.id === id) {
                return task;
            }
        }
    }

    function updateTask(task) {
        if (task.id) {
            for (var i = 0; i < _data.length; i++) {
                if (_data[i].id === task.id) {
                    _data[i] = task;
                    _updateData();

                    return task;
                }
            }
        } else {
            return createTask(task);
        }
    }

    function deleteTask(task) {
        for (var i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data.splice(i, 1);
                _updateData();

                return true;
            }
        }
    }

    function _readData(onSuccess, onError) {
        try {
            if (!_data) {
                var taskListStringified = localStorage.getItem(TASKS_KEY),
                    taskList = taskListStringified ? JSON.parse(taskListStringified.trim()) : [];

                taskList = Array.isArray(taskList) ? taskList : [taskList];
                _data = [];
                for (var i = 0; i < taskList.length; i++) {
                    var taskJson = taskList[i];

                    _data.push(new Task().fromJSON(taskJson));
                }
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (e) {
            if (onError) {
                onError(e);
            }
        }
    }

    function _updateData(onSuccess, onError) {
        var taskListJson = [],
            taskListStringified;

        for (var i = 0; i < _data.length; i++) {
            taskListJson.push(_data[i].toJSON());
        }

        taskListStringified = JSON.stringify(taskListJson);
        localStorage.setItem(TASKS_KEY, taskListStringified);

        if (onSuccess) {
            onSuccess(_data);
        }
    }

    return {
        initialize: initialize,
        getList: getList,
        updateList: updateList,
        createTask: createTask,
        getTask: getTask,
        updateTask: updateTask,
        deleteTask: deleteTask
    }
})();