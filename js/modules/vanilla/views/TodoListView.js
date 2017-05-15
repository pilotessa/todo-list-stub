if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.Vanilla) {
    AppScope.Vanilla = {}
}

AppScope.Vanilla.TodoListView = (function () {
    var TaskStatusEnum = AppScope.TaskStatusEnum;

    function getStaticContentOutput() {
        return '<ul class="todo-list list-group">' +
            '<li class="todo-list-header list-group-item active">' +
            '<input type="text" placeholder="What needs to be done?" autofocus="autofocus" class="todo-list-new-item-value form-control input-sm">' +
            '</li>' +
            '<li class="todo-list-footer list-group-item active form-inline">' +
            'With selected: ' +
            '<select class="todo-list-batch-update form-control input-sm">' +
            '<option value="">Choose action</option>' +
            '<option value="delete">Delete</option>' +
            '<option value="complete">Mark as complete</option>' +
            '<option value="active">Mark as active</option>' +
            '</select> ' +
            '<select class="todo-list-filter form-control input-sm">' +
            '<option value="">Show all</option>' +
            '<option value="active">Show active</option>' +
            '<option value="complete">Show complete</option>' +
            '</select>' +
            '</li>' +
            '</ul>';
    }

    function getTaskOutput(task) {
        var view = {
                task: task,
                liClassName: function () {
                    return task.status === TaskStatusEnum.ACTIVE_TASK ? 'list-group-item-warning' : 'list-group-item-success';
                },
                actionClassName: function () {
                    return task.status === TaskStatusEnum.ACTIVE_TASK ? 'glyphicon glyphicon-ok todo-list-item-mark-as-complete' : 'glyphicon glyphicon-repeat todo-list-item-mark-as-active';
                }
            },
            content = '<li id="{{task.id}}" class="todo-list-item list-group-item {{liClassName}}">' +
                '<div>' +
                '<span class="todo-list-title"><input type="checkbox" class="todo-list-item-check"{{#task.isChecked}} checked{{/task.isChecked}}>{{task.value}}</span>' +
                '<span class="todo-list-item-delete glyphicon glyphicon-remove"></span>' +
                '<span class="glyphicon {{actionClassName}}"></span>' +
                '</div>' +
                '</li>';

        return Mustache.render(content, view);
    }

    return {
        getStaticContentOutput: getStaticContentOutput,
        getTaskOutput: getTaskOutput
    }
})();