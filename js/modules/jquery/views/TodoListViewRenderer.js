if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.JQuery) {
    AppScope.JQuery = {}
}

AppScope.JQuery.TodoListViewRenderer = (function () {
    var $footer;

    function renderStaticContent(wrapperId) {
        var $wrapper = $('#' + wrapperId);

        if (!$wrapper.length) {
            throw new Error("List container is missing");
        }

        $wrapper.html(AppScope.TodoListView.getStaticContentOutput());

        $footer = $wrapper.find('.todo-list-footer');
        AppScope.domElements = {
            list: $wrapper.find('.todo-list')[0],
            newValue: $wrapper.find('.todo-list-new-item-value')[0],
            batchUpdate: $wrapper.find('.todo-list-batch-update')[0],
            filter: $wrapper.find('.todo-list-filter')[0]
        };
    }

    function renderTask(task) {
        var $li = $('#' + task.id);

        if (!$li.length) {
            $li = $('<li></li>').insertBefore($footer);
        }
        $li.replaceWith(AppScope.TodoListView.getTaskOutput(task));
    }

    return {
        renderStaticContent: renderStaticContent,
        renderTask: renderTask
    }
})();