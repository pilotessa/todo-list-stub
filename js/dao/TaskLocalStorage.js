if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskLocalStorage = (function () {

    var TASKS_KEY = AppScope.localStorageConstants.TASK_LIST,
        Task = AppScope.Task;

    function readData(onSuccess, onError) {
        try {
            var taskListStringified = localStorage.getItem(TASKS_KEY),
                taskList = taskListStringified ? JSON.parse(taskListStringified.trim()) : [],
                data = [];

            taskList = Array.isArray(taskList) ? taskList : [taskList];
            for (var i = 0; i < taskList.length; i++) {
                var taskJson = taskList[i];

                data.push(new Task().fromJSON(taskJson));
            }

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (e) {
            if (onError) {
                onError(e);
            }
        }
    }

    function updateData(data, onSuccess, onError) {
        var taskListJson = [],
            taskListStringified;

        try {
            for (var i = 0; i < data.length; i++) {
                var task = data[i];

                if (task.isDeleted) {
                    continue;
                }
                if (task.isChanged) {
                    if (!task.id) {
                        task.id = '_' + Math.random().toString(36).substr(2, 9);
                    }

                    delete(task.isChanged);
                }

                taskListJson.push(task.toJSON());
            }

            taskListStringified = JSON.stringify(taskListJson);
            localStorage.setItem(TASKS_KEY, taskListStringified);

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (e) {
            if (onError) {
                onError(e);
            }
        }
    }

    return {
        readData: readData,
        updateData: updateData
    }
})();