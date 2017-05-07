if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskLocalStorage = (function () {

    var TASKS_KEY = AppScope.localStorageConstants.TASK_LIST;
    var Task = AppScope.Task;
    var data; // List data cache

    function getAll(onSuccess) {
        try {
            if (!data) {
                var taskListStringified = localStorage.getItem(TASKS_KEY),
                    taskList = taskListStringified ? JSON.parse(taskListStringified.trim()) : [];

                taskList = Array.isArray(taskList) ? taskList : [taskList];
                data = [];
                for (var i = 0; i < taskList.length; i++) {
                    var taskJson = taskList[i];

                    data.push(new Task().fromJSON(taskJson));
                }
            }

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    function updateAll(taskList, onSuccess) {
        var taskListJson = [],
            taskListStringified;

        data = taskList;
        for (var i = 0; i < data.length; i++) {
            taskListJson.push(data[i].toJSON());
        }

        taskListStringified = JSON.stringify(taskListJson);
        localStorage.setItem(TASKS_KEY, taskListStringified);

        if (onSuccess) {
            onSuccess();
        }
    }

    function createElement(el, onSuccess) {
        getAll(
            function (taskList) {
                el.id = '_' + Math.random().toString(36).substr(2, 9);
                taskList.push(el);

                updateAll(taskList, function () {
                    if (onSuccess) {
                        onSuccess(el);
                    }
                });
            }
        );
    }

    function getElement(id, onSuccess) {
        getAll(
            function (taskList) {
                for (var i = 0; i < taskList.length; i++) {
                    var task = taskList[i];

                    if (task.id === id) {
                        if (onSuccess) {
                            onSuccess(task);
                        }

                        break;
                    }
                }
            }
        );
    }

    function updateElement(el, onSuccess) {
        if (el.id) {
            getAll(
                function (taskList) {
                    for (var i = 0; i < taskList.length; i++) {
                        if (taskList[i].id === el.id) {
                            taskList[i] = el;
                            updateAll(taskList, function () {
                                if (onSuccess) {
                                    onSuccess(el);
                                }
                            });

                            break;
                        }
                    }
                }
            );
        }
    }

    function deleteElement(el, onSuccess) {
        getAll(
            function (taskList) {
                for (var i = 0; i < taskList.length; i++) {
                    if (taskList[i].id === el.id) {
                        taskList.splice(i, 1);
                        updateAll(taskList, function () {
                            if (onSuccess) {
                                onSuccess(el);
                            }
                        });

                        break;
                    }
                }
            }
        );
    }

    return {
        getAll: getAll,
        createElement: createElement,
        getElement: getElement,
        updateElement: updateElement,
        deleteElement: deleteElement
    }
})();