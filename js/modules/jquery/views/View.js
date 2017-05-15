if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.JQuery) {
    AppScope.JQuery = {}
}

AppScope.JQuery.View = (function () {
    var TaskStatusEnum = AppScope.TaskStatusEnum,
        $footer;

    function renderStaticContent(wrapperId) {
        var $wrapper = $('#' + wrapperId);
        if (!$wrapper.length) {
            throw new Error("List container is missing");
        }

        var content = '<ul class="todo-list list-group">' +
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

        $wrapper.html(content);

        $footer = $wrapper.find('.todo-list-footer');
        AppScope.domElements = {
            list: $wrapper.find('.todo-list')[0],
            newValue: $wrapper.find('.todo-list-new-item-value')[0],
            batchUpdate: $wrapper.find('.todo-list-batch-update')[0],
            filter: $wrapper.find('.todo-list-filter')[0]
        };
    }

    function renderList(list) {
        for (var i = 0; i < list.length; i++) {
            var task = list[i];

            renderTask(task);
        }
    }

    function renderTask(task) {
        var $li,
            liClassName,
            actionClassName;

        $li = task.id ? $('#' + task.id) : null;
        if (!$li || !$li.length) {
            $li = $('<li id="' + task.id + '"></li>').insertBefore($footer);
        }

        if (task.status === TaskStatusEnum.ACTIVE_TASK) {
            liClassName = 'list-group-item-warning';
            actionClassName = 'glyphicon glyphicon-ok todo-list-item-mark-as-complete';
        } else if (task.status === TaskStatusEnum.COMPLETED_TASK) {
            liClassName = 'list-group-item-success';
            actionClassName = 'glyphicon glyphicon-repeat todo-list-item-mark-as-active';
        }

        $li.removeClass().addClass('todo-list-item').addClass('list-group-item').addClass(liClassName);
        $li.html('<div>' +
            '<span class="todo-list-title"><input type="checkbox" class="todo-list-item-check"' + (task.isChecked ? 'checked' : '') + '>' + task.value + '</span>' +
            '<span class="todo-list-item-delete glyphicon glyphicon-remove"></span>' +
            '<span class="glyphicon ' + actionClassName + '"></span>' +
            '</div>');
    }

    return {
        renderStaticContent: renderStaticContent,
        renderList: renderList,
        renderTask: renderTask
    }
})();