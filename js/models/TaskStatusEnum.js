if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TaskStatusEnum = (function () {
    var TaskStatus = function (code, label) {
        this.code = code;
        this.label = label;
    };

    var ACTIVE_TASK = new TaskStatus('ACTIVE_TASK', 'Active');
    var COMPLETED_TASK = new TaskStatus('COMPLETED_TASK', 'Completed');

    function getByCode(code) {
        if (code in this) {
            return this[code];
        } else {
            throw new Error("Task Code is not found");
        }
    }

    return {
        ACTIVE_TASK: ACTIVE_TASK,
        COMPLETED_TASK: COMPLETED_TASK,
        getByCode: getByCode
    }
})();