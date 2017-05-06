if (!!!AppScope) {
    var AppScope = {}
}

AppScope.TodoListController = (function () {

    var isInitialized,
        taskListWrapperId,
        $taskListWrapper,
        $taskList,
        $taskListNewValue,
        $taskListFooter,
        $taskListMassUpdate,
        $taskListFilter,
        createTaskListener,
        updateTaskListener,
        massUpdateListener,
        filterListener;

    function initialize(wrapperId) {
        if (!isInitialized) {
            if (!wrapperId) {
                throw new Error("List ID is undefined");
            }

            isInitialized = true;
            taskListWrapperId = wrapperId;

            renderStaticContent();
            initStaticContentListeners();

            loadTaskList();
            filterTaskList();
        } else {
            loadTaskList();
            filterTaskList();
        }
    }

    function getElementNode(el) {
        return el.id ? document.getElementById(el.id) : null;
    }

    function renderElement(el) {
        var $li,
            liClassName,
            actionClassName;

        if (el.id) {
            $li = getElementNode(el);
        }

        if (!$li) {
            $li = document.createElement('li');
            $li.id = el.id;
        }

        if (el.status === AppScope.TaskStatusEnum.ACTIVE_TASK) {
            liClassName = 'list-group-item-warning';
            actionClassName = 'glyphicon glyphicon-ok todo-list-item-mark-as-complete';
        } else if (el.status === AppScope.TaskStatusEnum.COMPLETED_TASK) {
            liClassName = 'list-group-item-success';
            actionClassName = 'glyphicon glyphicon-repeat todo-list-item-mark-as-active';
        }

        $li.className = 'todo-list-item list-group-item ' + liClassName;
        $li.innerHTML = '<div>' +
            '<span class="todo-list-title"><input type="checkbox" class="todo-list-item-check"' + (el.isChecked ? 'checked' : '') + '>' + el.value + '</span>' +
            '<span class="todo-list-item-delete glyphicon glyphicon-remove"></span>' +
            '<span class="glyphicon ' + actionClassName + '"></span>' +
            '</div>';

        return $li;
    }

    function renderList(taskList) {
        for (var i = 0; i < taskList.length; i++) {
            var el = taskList[i],
                $li = renderElement(el);

            $taskList.insertBefore($li, $taskListFooter);
        }
    }

    function renderStaticContent() {
        var content = '<ul class="todo-list list-group">' +
                '<li class="todo-list-header list-group-item active">' +
                    '<input type="text" placeholder="What needs to be done?" autofocus="autofocus" class="todo-list-new-item-value form-control input-sm">' +
                '</li>' +
                '<li class="todo-list-footer list-group-item active form-inline">' +
                    'With selected: ' +
                    '<select class="todo-list-mass-update form-control input-sm">' +
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

        $taskListWrapper = document.getElementById(taskListWrapperId);
        $taskListWrapper.innerHTML = content;

        $taskList = $taskListWrapper.getElementsByTagName('ul')[0];
        $taskListNewValue = $taskList.getElementsByClassName('todo-list-new-item-value')[0];
        $taskListFooter = $taskList.getElementsByClassName('todo-list-footer')[0];
        $taskListMassUpdate = $taskList.getElementsByClassName('todo-list-mass-update')[0];
        $taskListFilter = $taskList.getElementsByClassName('todo-list-filter')[0];
    }

    function initStaticContentListeners() {
        createTaskListener = function (event) {
            if (event.keyCode == 13) {
                AppScope.TaskService.createElement(
                    this.value,
                    function (el) {
                        var $li = renderElement(el);

                        $taskList.insertBefore($li, $taskListFooter);
                        $taskListNewValue.value = '';
                    }
                );
            }
        };
        $taskListNewValue.addEventListener('keyup', createTaskListener, false);

        updateTaskListener = function (event) {
            var $li,
                el;

            if (event.target.className.indexOf('todo-list-item-check') + 1) {
                $li = event.target.parentNode.parentNode.parentNode;
                AppScope.TaskService.getElement(
                    $li.id,
                    function (el) {
                        AppScope.TaskService.toggleIsChecked(el);
                    }
                );
            } else if (event.target.className.indexOf('todo-list-item-mark-as-complete') + 1) {
                $li = event.target.parentNode.parentNode;
                AppScope.TaskService.getElement(
                    $li.id,
                    function (el) {
                        AppScope.TaskService.markAs(
                            el,
                            AppScope.TaskStatusEnum.COMPLETED_TASK,
                            function (el) {
                                renderElement(el);
                            }
                        );
                    }
                );
            } else if (event.target.className.indexOf('todo-list-item-delete') + 1) {
                $li = event.target.parentNode.parentNode;
                AppScope.TaskService.getElement(
                    $li.id,
                    function (el) {
                        AppScope.TaskService.deleteElement(
                            el,
                            function (el) {
                                $taskList.removeChild($li);
                            }
                        );
                    }
                );
            } else if (event.target.className.indexOf('todo-list-item-mark-as-active') + 1) {
                $li = event.target.parentNode.parentNode;
                AppScope.TaskService.getElement(
                    $li.id,
                    function (el) {
                        AppScope.TaskService.markAs(
                            el,
                            AppScope.TaskStatusEnum.ACTIVE_TASK,
                            function (el) {
                                renderElement(el);
                            }
                        );
                    }
                );
            }
        };
        $taskList.addEventListener('click', updateTaskListener, false);

        massUpdateListener = function (event) {
            var action  = this.value;

            this.value = '';

            AppScope.TaskService.getAll(
                function (taskList) {
                    for (var i = 0; i < taskList.length; i++) {
                        var el = taskList[i];

                        if (el.isChecked) {
                            switch (action) {
                                case 'delete':
                                    AppScope.TaskService.deleteElement(
                                        el,
                                        function (el) {
                                            var $li = getElementNode(el);

                                            $taskList.removeChild($li);
                                        }
                                    );

                                    break;
                                case 'complete':
                                    AppScope.TaskService.markAs(
                                        el,
                                        AppScope.TaskStatusEnum.COMPLETED_TASK,
                                        function (el) {
                                            AppScope.TaskService.toggleIsChecked(el, function () {
                                                renderElement(el);
                                            });
                                        }
                                    );

                                    break;
                                case 'active':
                                    AppScope.TaskService.markAs(
                                        el,
                                        AppScope.TaskStatusEnum.ACTIVE_TASK,
                                        function (el) {
                                            AppScope.TaskService.toggleIsChecked(el, function () {
                                                renderElement(el);
                                            });
                                        }
                                    );

                                    break;
                            }
                        }
                    }
                }
            );
        };
        $taskListMassUpdate.addEventListener('change', massUpdateListener, false);

        filterListener = function (event) {
            var filter  = this.value;

            if (filter) {
                window.location.hash = '#' + filter;
            } else {
                history.replaceState({}, document.title, ".");
            }
            filterTaskList();
        };
        $taskListFilter.addEventListener('change', filterListener, false);
    }

    function loadTaskList() {
        if (!isInitialized) {
            return;
        }

        AppScope.TaskService.getAll(
            function (taskList) {
                renderList(taskList);
            }
        );
    }

    function filterTaskList() {
        var filter = window.location.hash.replace('#', '');

        $taskList.className = $taskList.className.replace(/(\stodo-list-filter-active)?(\stodo-list-filter-complete)?/g, '');
        if (filter) {
            $taskList.className += ' todo-list-filter-' + filter;
        }

        $taskListFilter.value = filter;
    }

    function closeStaticContentListeners() {
        $taskListNewValue.removeEventListener('keyup', createTaskListener, false);
        $taskList.removeEventListener('click', updateTaskListener, false);
        $taskListMassUpdate.removeEventListener('change', massUpdateListener, false);
        $taskListFilter.removeEventListener('change', filterListener, false);
    }

    function close() {
        if (isInitialized) {
            isInitialized = false;

            closeStaticContentListeners();
        }
    }

    return {
        initialize: initialize,
        close: close
    }
})();