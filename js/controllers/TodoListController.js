if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TodoListController = (function () {
    var DomService = AppScope.DomService,
        Task = AppScope.Task,
        TaskStatusEnum = AppScope.TaskStatusEnum,
        TaskService = AppScope.TaskService,
        View = AppScope.TodoListView,
        listWrapperId,
        $list,
        $newValue,
        $footer,
        $batchUpdate,
        $filter;

    function initialize(wrapperId) {
        if (!wrapperId) {
            throw new Error("List ID is undefined");
        }
        listWrapperId = wrapperId;

        // Init services
        DomService.initialize();
        TaskService.initialize(onTaskServiceInitialize);
    }

    function onTaskServiceInitialize() {
        if (!$list) {
            renderStaticContent(listWrapperId);
            initStaticContentListeners();
        }

        loadList();
        filterList();
    }

    function renderStaticContent() {
        var $wrapper = DomService.getById(listWrapperId);

        if (!$wrapper) {
            throw new Error("List container is missing");
        }

        DomService.setInnerHtml($wrapper, View.getStaticContentOutput());

        $list = DomService.getByClass('todo-list', $wrapper);
        $newValue = DomService.getByClass('todo-list-new-item-value', $wrapper);
        $footer = DomService.getByClass('todo-list-footer', $wrapper);
        $batchUpdate = DomService.getByClass('todo-list-batch-update', $wrapper);
        $filter = DomService.getByClass('todo-list-filter', $wrapper);
    }

    function initStaticContentListeners() {
        DomService.addListener($newValue, 'keyup', onTaskCreate);
        DomService.addListener($list, 'click', onTaskUpdate);
        DomService.addListener($batchUpdate, 'change', onBatchUpdate);
        DomService.addListener($filter, 'change', onListFilter);
    }

    function onTaskCreate(event) {
        if (event.keyCode == 13) {
            var task = new Task();

            task.value = this.value;
            task.status = TaskStatusEnum.ACTIVE_TASK;
            task.isChecked = false;
            task.id = TaskService.createTask(task);

            renderTask(task);
            $newValue.value = '';
        }
    }

    function onTaskUpdate(event) {
        var li,
            task;

        if (DomService.hasClass(event.target, 'todo-list-item-check')) {
            li = event.target.parentNode.parentNode.parentNode;
            task = TaskService.getTask(li.id);

            task.isChecked = !task.isChecked;
            TaskService.updateTask(task);
        } else if (DomService.hasClass(event.target, 'todo-list-item-mark-as-complete')) {
            li = event.target.parentNode.parentNode;
            task = TaskService.getTask(li.id);

            task.status = TaskStatusEnum.COMPLETED_TASK;
            TaskService.updateTask(task);

            renderTask(task);
        } else if (DomService.hasClass(event.target, 'todo-list-item-delete')) {
            li = event.target.parentNode.parentNode;
            task = TaskService.getTask(li.id);

            TaskService.deleteTask(task);

            $list.removeChild(li);
        } else if (DomService.hasClass(event.target, 'todo-list-item-mark-as-active')) {
            li = event.target.parentNode.parentNode;
            task = TaskService.getTask(li.id);

            task.status = TaskStatusEnum.ACTIVE_TASK;
            TaskService.updateTask(task);

            renderTask(task);
        }
    }

    function onBatchUpdate() {
        var action = this.value,
            list = TaskService.getList(),
            task;

        switch (action) {
            case 'delete':
                for (var i = 0; i < list.length; i++) {
                    task = list[i];

                    if (task.isChecked) {
                        var li = DomService.getById(task.id);

                        TaskService.deleteTask(task);

                        $list.removeChild(li);
                    }
                }

                break;
            case 'complete':
                for (var i = 0; i < list.length; i++) {
                    task = list[i];

                    if (task.isChecked) {
                        task.status = TaskStatusEnum.COMPLETED_TASK;
                        task.isChecked = false;
                        TaskService.updateTask(task);

                        renderTask(task);
                    }
                }

                break;
            case 'active':
                for (var i = 0; i < list.length; i++) {
                    task = list[i];

                    if (task.isChecked) {
                        task.status = TaskStatusEnum.ACTIVE_TASK;
                        task.isChecked = false;
                        TaskService.updateTask(task);

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
        var list = TaskService.getList();

        renderList(list);
    }

    function filterList() {
        var filter = window.location.hash.replace('#', '');

        DomService.removeClass($list, 'todo-list-filter-active');
        DomService.removeClass($list, 'todo-list-filter-complete');
        if (filter) {
            DomService.addClass($list, 'todo-list-filter-' + filter);
        }

        $filter.value = filter;
    }

    function renderList(list) {
        for (var i = 0; i < list.length; i++) {
            var task = list[i];

            renderTask(task);
        }
    }

    function renderTask(task) {
        var $li = DomService.getById(task.id);

        if (!$li) {
            $li = DomService.create('li');
            DomService.insertBefore($li, $footer);
        }
        DomService.setOuterHtml($li, View.getTaskOutput(task));
    }

    function close() {
        closeTaskService();
        closeStaticContentListeners();
    }

    function closeTaskService() {
        DomService.removeListener(document, 'taskServiceInitialize', onServiceInitialize);
    }

    function closeStaticContentListeners() {
        DomService.removeListener($newValue, 'keyup', onTaskCreate);
        DomService.removeListener($list, 'click', onTaskUpdate);
        DomService.removeListener($batchUpdate, 'change', onBatchUpdate);
        DomService.removeListener($filter, 'change', onListFilter);
    }

    return {
        initialize: initialize,
        close: close
    }
})();