if (!!!AppScope) {
    var AppScope = {}
}

AppScope.DomService = (function () {
    var _domUtils;

    function initialize() {
        if (AppScope.config.module == 'jQuery') {
            _domUtils = AppScope.DomUtilsJQuery;
        } else {
            _domUtils = AppScope.DomUtilsVanilla;
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

    function getByClass(className, parent) {
        return _domUtils.getByClass(className, parent);
    }

    function create(tag) {
        return _domUtils.create(tag);
    }

    function insertBefore(itemToInsert, tagret) {
        _domUtils.insertBefore(itemToInsert, tagret);
    }

    function setInnerHtml(target, content) {
        _domUtils.setInnerHtml(target, content);
    }

    function setOuterHtml(target, content) {
        _domUtils.setOuterHtml(target, content);
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
        getByClass: getByClass,
        create: create,
        insertBefore: insertBefore,
        setInnerHtml: setInnerHtml,
        setOuterHtml: setOuterHtml,
        addListener: addListener,
        removeListener: removeListener
    }
})();