if (!!!AppScope) {
    var AppScope = {}
}

AppScope.DomService = (function () {
    var _domUtils;

    function initialize() {
        if (AppScope.config.module == 'jQuery') {
            _domUtils = AppScope.JQuery.DomUtils;
        } else {
            _domUtils = AppScope.Vanilla.DomUtils;
        }
    }

    function hasClass(target, className) {
        return _domUtils.hasClass(target, className);
    }

    function addClass(target, className) {
        _domUtils.addClass(target, className);
    }

    function removeClass(target, className) {
        _domUtils.removeClass(target, className);
    }

    function getById(id) {
        return _domUtils.getById(id);
    }

    function addListener(target, eventName, handler) {
        _domUtils.addListener(target, eventName, handler);
    }

    function removeListener(target, eventName, handler) {
        _domUtils.removeListener(target, eventName, handler);
    }

    return {
        initialize: initialize,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getById: getById,
        addListener: addListener,
        removeListener: removeListener
    }
})();