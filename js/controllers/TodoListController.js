if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TodoListController = (function () {

    var TaskService = AppScope.TaskService,
        isInitialized,
        listWrapperId,
        $listWrapper,
        $list,
        $listNewValue,
        $listFooter,
        $listBatchUpdate,
        $listFilter;

    function initialize(wrapperId) {
        if (!wrapperId) {
            throw new Error("List ID is undefined");
        }

        listWrapperId = wrapperId;

        // Initialize Service / Caches
        document.addEventListener('taskServiceInitialize', onServiceInitialize, false);
        AppScope.TaskService.initialize(onServiceInitialize);
    }

    function  onServiceInitialize() {
        if (!isInitialized) {
            isInitialized = true;

            renderStaticContent();
            initStaticContentListeners();
        }

        loadList();
        filterList();
    }

    function renderStaticContent() {
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

        $listWrapper = document.getElementById(listWrapperId);
        $listWrapper.innerHTML = content;

        $list = $listWrapper.getElementsByTagName('ul')[0];
        $listNewValue = $list.getElementsByClassName('todo-list-new-item-value')[0];
        $listFooter = $list.getElementsByClassName('todo-list-footer')[0];
        $listBatchUpdate = $list.getElementsByClassName('todo-list-batch-update')[0];
        $listFilter = $list.getElementsByClassName('todo-list-filter')[0];
    }

    function initStaticContentListeners() {
        $listNewValue.addEventListener('keyup', onTaskCreate, false);
        $list.addEventListener('click', onTaskUpdate, false);
        $listBatchUpdate.addEventListener('change', onBatchUpdate, false);
        $listFilter.addEventListener('change', onListFilter, false);
    }

    function onTaskCreate(event) {
        if (event.keyCode == 13) {
            var task = TaskService.createTask(this.value),
                $li = renderTask(task);

            $list.insertBefore($li, $listFooter);
            $listNewValue.value = '';
        }
    }

    function onTaskUpdate(event) {
        var $li,
            task;

        if (event.target.className.indexOf('todo-list-item-check') != -1) {
            $li = event.target.parentNode.parentNode.parentNode;
            task = TaskService.getTask($li.id);

            TaskService.toggleTaskIsChecked(task);
        } else if (event.target.className.indexOf('todo-list-item-mark-as-complete') != -1) {
            $li = event.target.parentNode.parentNode;
            task = TaskService.getTask($li.id);

            TaskService.markTaskAs(task, AppScope.TaskStatusEnum.COMPLETED_TASK);
            renderTask(task);
        } else if (event.target.className.indexOf('todo-list-item-delete') != -1) {
            $li = event.target.parentNode.parentNode;
            task = TaskService.getTask($li.id);

            TaskService.deleteTask(task);
            $list.removeChild($li);
        } else if (event.target.className.indexOf('todo-list-item-mark-as-active') != -1) {
            $li = event.target.parentNode.parentNode;
            task = TaskService.getTask($li.id);

            TaskService.markTaskAs(task,AppScope.TaskStatusEnum.ACTIVE_TASK);
            renderTask(task);
        }
    }

    function onBatchUpdate() {
        var action = this.value,
            list = TaskService.getList();

        switch (action) {
            case 'delete':
                for (var i = 0; i < list.length; i++) {
                    var task = list[i];

                    if (task.isChecked) {
                        var $li = document.getElementById(task.id);

                        TaskService.deleteTask(task);
                        $list.removeChild($li);
                    }
                }

                break;
            case 'complete':
                for (var i = 0; i < list.length; i++) {
                    var task = list[i];

                    if (task.isChecked) {
                        TaskService.markTaskAs(task, AppScope.TaskStatusEnum.COMPLETED_TASK);
                        TaskService.toggleTaskIsChecked(task);
                        renderTask(task);
                    }
                }

                break;
            case 'active':
                for (var i = 0; i < list.length; i++) {
                    var task = list[i];

                    if (task.isChecked) {
                        TaskService.markTaskAs(task, AppScope.TaskStatusEnum.ACTIVE_TASK);
                        TaskService.toggleTaskIsChecked(task);
                        renderTask(task);
                    }
                }

                break;
        }

        this.value = '';
    }

    function onListFilter(event) {
        var filter  = this.value;

        if (filter) {
            window.location.hash = '#' + filter;
        } else {
            history.replaceState({}, document.title, ".");
        }

        filterList();
    }

    function loadList() {
        if (!isInitialized) {
            return;
        }

        var list = TaskService.getList();
        renderList(list);
    }

    function renderList(list) {
        for (var i = 0; i < list.length; i++) {
            var task = list[i],
                $li = renderTask(task);

            $list.insertBefore($li, $listFooter);
        }
    }

    function renderTask(task) {
        var $li,
            liClassName,
            actionClassName;

        if (task) {
            $li = task.id ? document.getElementById(task.id) : null;
        }

        if (!$li) {
            $li = document.createElement('li');
            $li.id = task.id;
        }

        if (task.status === AppScope.TaskStatusEnum.ACTIVE_TASK) {
            liClassName = 'list-group-item-warning';
            actionClassName = 'glyphicon glyphicon-ok todo-list-item-mark-as-complete';
        } else if (task.status === AppScope.TaskStatusEnum.COMPLETED_TASK) {
            liClassName = 'list-group-item-success';
            actionClassName = 'glyphicon glyphicon-repeat todo-list-item-mark-as-active';
        }

        $li.className = 'todo-list-item list-group-item ' + liClassName;
        $li.innerHTML = '<div>' +
            '<span class="todo-list-title"><input type="checkbox" class="todo-list-item-check"' + (task.isChecked ? 'checked' : '') + '>' + task.value + '</span>' +
            '<span class="todo-list-item-delete glyphicon glyphicon-remove"></span>' +
            '<span class="glyphicon ' + actionClassName + '"></span>' +
            '</div>';

        return $li;
    }

    function filterList() {
        var filter = window.location.hash.replace('#', '');

        $list.className = $list.className.replace(/(\stodo-list-filter-active)?(\stodo-list-filter-complete)?/g, '');
        if (filter) {
            $list.className += ' todo-list-filter-' + filter;
        }

        $listFilter.value = filter;
    }

    function close() {
        if (isInitialized) {
            isInitialized = false;

            document.removeEventListener('taskServiceInitialize', onServiceInitialize, false);

            closeStaticContentListeners();
        }
    }

    function closeStaticContentListeners() {
        $listNewValue.removeEventListener('keyup', onTaskCreate, false);
        $list.removeEventListener('click', onTaskUpdate, false);
        $listBatchUpdate.removeEventListener('change', onBatchUpdate, false);
        $listFilter.removeEventListener('change', onListFilter, false);
    }

    return {
        initialize: initialize,
        close: close
    }
})();