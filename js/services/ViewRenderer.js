if (!!!AppScope) {
    var AppScope = {}
}

AppScope.ViewRenderer = (function () {
    var _view;

    function initialize() {
        if (AppScope.config.module == 'jQuery') {
            _view = AppScope.JQuery.View;
        } else {
            _view = AppScope.Vanilla.View;
        }
    }

    function renderStaticContent(wrapperId) {
        _view.renderStaticContent(wrapperId);
    }

    function renderList(list) {
        _view.renderList(list);
    }

    function renderTask(task) {
        _view.renderTask(task);
    }

    return {
        initialize: initialize,
        renderStaticContent: renderStaticContent,
        renderList: renderList,
        renderTask: renderTask
    }
})();