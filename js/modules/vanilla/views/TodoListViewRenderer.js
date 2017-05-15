if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.Vanilla) {
    AppScope.Vanilla = {}
}

AppScope.Vanilla.TodoListViewRenderer = (function () {
    var _footer;

    function renderStaticContent(wrapperId) {
        var wrapper = document.getElementById(wrapperId);

        if (!wrapper) {
            throw new Error("List container is missing");
        }

        wrapper.innerHTML = AppScope.TodoListView.getStaticContentOutput();

        _footer = wrapper.getElementsByClassName('todo-list-footer')[0];
        AppScope.domElements = {
            list: wrapper.getElementsByClassName('todo-list')[0],
            newValue: wrapper.getElementsByClassName('todo-list-new-item-value')[0],
            batchUpdate: wrapper.getElementsByClassName('todo-list-batch-update')[0],
            filter: wrapper.getElementsByClassName('todo-list-filter')[0]
        };
    }

    function renderTask(task) {
        var li = task.id ? document.getElementById(task.id) : null;

        if (!li) {
            li = document.createElement('li');
            AppScope.domElements.list.insertBefore(li, _footer);
        }
        li.outerHTML = AppScope.TodoListView.getTaskOutput(task);
    }

    return {
        renderStaticContent: renderStaticContent,
        renderTask: renderTask
    }
})();