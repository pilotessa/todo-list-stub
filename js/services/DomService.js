if (!!!AppScope) {
    var AppScope = {}
}

AppScope.DomService = (function () {
    var isInitialized,
        _domUtils;

    function initialize() {
        if (!isInitialized) {
            if (AppScope.config.domUtils == 'jQuery') {
                _domUtils = AppScope.JQuery.DomUtils;
            } else {
                _domUtils = AppScope.Vanilla.DomUtils;
            }
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

    function getByClass(name) {
        return _domUtils.getByClass(name);
    }

    function getByTag(name) {
        return _domUtils.getByTag(name);
    }

    function addListener(target, eventName, handler) {
        _domUtils.addListener(target, eventName, handler);
    }

    function removeListener(target, eventName, handler) {
        _domUtils.removeListener(target, eventName, handler);
    }

    function trigger(target, eventName) {
        _domUtils.trigger(target, eventName);
    }

    return {
        initialize: initialize,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getById: getById,
        getByClass: getByClass,
        getByTag: getByTag,
        addListener: addListener,
        removeListener: removeListener,
        trigger: trigger
    }
})();