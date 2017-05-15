if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.Vanilla) {
    AppScope.Vanilla = {}
}

AppScope.Vanilla.View = (function () {
    var TaskStatusEnum = AppScope.TaskStatusEnum,
        $footer;

    function renderStaticContent(wrapperId) {
        var $wrapper = document.getElementById(wrapperId);
        if (!$wrapper) {
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

        $wrapper.innerHTML = content;

        $footer = $wrapper.getElementsByClassName('todo-list-footer')[0];
        AppScope.domElements = {
            $list: $wrapper.getElementsByClassName('todo-list')[0],
            $newValue: $wrapper.getElementsByClassName('todo-list-new-item-value')[0],
            $batchUpdate: $wrapper.getElementsByClassName('todo-list-batch-update')[0],
            $filter: $wrapper.getElementsByClassName('todo-list-filter')[0]
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

        $li = task.id ? document.getElementById(task.id) : null;
        if (!$li) {
            $li = document.createElement('li');
            $li.id = task.id;
            AppScope.domElements.$list.insertBefore($li, $footer);
        }

        if (task.status === TaskStatusEnum.ACTIVE_TASK) {
            liClassName = 'list-group-item-warning';
            actionClassName = 'glyphicon glyphicon-ok todo-list-item-mark-as-complete';
        } else if (task.status === TaskStatusEnum.COMPLETED_TASK) {
            liClassName = 'list-group-item-success';
            actionClassName = 'glyphicon glyphicon-repeat todo-list-item-mark-as-active';
        }

        $li.className = 'todo-list-item list-group-item ' + liClassName;
        $li.innerHTML = '<div>' +
            '<span class="todo-list-title"><input type="checkbox" class="todo-list-item-check"' + (task.isChecked ? 'checked' : '') + '>' + task.value + '</span>' +
            '<span class="todo-list-item-delete glyphicon glyphicon-remove"></span>' +
            '<span class="glyphicon ' + actionClassName + '"></span>' +
            '</div>';
    }

    return {
        renderStaticContent: renderStaticContent,
        renderList: renderList,
        renderTask: renderTask
    }
})();