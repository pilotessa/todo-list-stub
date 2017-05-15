if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TodoListController = (function () {

    var DomService = AppScope.DomService,
        ViewRenderer = AppScope.ViewRenderer,
        Task = AppScope.Task,
        TaskStatusEnum = AppScope.TaskStatusEnum,
        TaskService = AppScope.TaskService,
        listWrapperId;

    function initialize(wrapperId) {
        if (!wrapperId) {
            throw new Error("List ID is undefined");
        }
        listWrapperId = wrapperId;

        initServices();
    }

    function initServices() {
        DomService.initialize();
        ViewRenderer.initialize();
        TaskService.initialize(onTaskServiceInitialize);
    }

    function onTaskServiceInitialize() {
        if (!AppScope.domElements) {
            ViewRenderer.renderStaticContent(listWrapperId);
            initStaticContentListeners();
        }

        loadList();
        filterList();
    }

    function initStaticContentListeners() {
        DomService.addListener(AppScope.domElements.newValue, 'keyup', onTaskCreate);
        DomService.addListener(AppScope.domElements.list, 'click', onTaskUpdate);
        DomService.addListener(AppScope.domElements.batchUpdate, 'change', onBatchUpdate);
        DomService.addListener(AppScope.domElements.filter, 'change', onListFilter);
    }

    function onTaskCreate(event) {
        if (event.keyCode == 13) {
            var task = new Task();

            task.value = this.value;
            task.status = TaskStatusEnum.ACTIVE_TASK;
            task.isChecked = false;
            task.id = TaskService.createTask(task);

            ViewRenderer.renderTask(task);
            AppScope.domElements.newValue.value = '';
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

            ViewRenderer.renderTask(task);
        } else if (DomService.hasClass(event.target, 'todo-list-item-delete')) {
            li = event.target.parentNode.parentNode;
            task = TaskService.getTask(li.id);

            TaskService.deleteTask(task);

            AppScope.domElements.list.removeChild(li);
        } else if (DomService.hasClass(event.target, 'todo-list-item-mark-as-active')) {
            li = event.target.parentNode.parentNode;
            task = TaskService.getTask(li.id);

            task.status = TaskStatusEnum.ACTIVE_TASK;
            TaskService.updateTask(task);

            ViewRenderer.renderTask(task);
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

                        AppScope.domElements.list.removeChild(li);
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

                        ViewRenderer.renderTask(task);
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

                        ViewRenderer.renderTask(task);
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

        ViewRenderer.renderList(list);
    }

    function filterList() {
        var filter = window.location.hash.replace('#', '');

        DomService.removeClass(AppScope.domElements.list, 'todo-list-filter-active');
        DomService.removeClass(AppScope.domElements.list, 'todo-list-filter-complete');
        if (filter) {
            DomService.addClass(AppScope.domElements.list, 'todo-list-filter-' + filter);
        }

        AppScope.domElements.filter.value = filter;
    }

    function close() {
        closeTaskService();
        closeStaticContentListeners();
    }

    function closeTaskService() {
        DomService.removeListener(document, 'taskServiceInitialize', onServiceInitialize);
    }

    function closeStaticContentListeners() {
        DomService.removeListener(AppScope.domElements.newValue, 'keyup', onTaskCreate);
        DomService.removeListener(AppScope.domElements.list, 'click', onTaskUpdate);
        DomService.removeListener(AppScope.domElements.batchUpdate, 'change', onBatchUpdate);
        DomService.removeListener(AppScope.domElements.filter, 'change', onListFilter);
    }

    return {
        initialize: initialize,
        close: close
    }
})();