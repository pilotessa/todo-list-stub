if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.JQuery) {
    AppScope.JQuery = {}
}

AppScope.JQuery.DomUtils = (function () {
    function hasClass(target, className) {
        return $(target).hasClass(className);
    }

    function addClass(target, className) {
        $(target).addClass(className);
    }

    function removeClass(target, className) {
        if (className) {
            $(target).removeClass(className);
        } else {
            $(target).removeClass();
        }
    }

    function getById(id) {
        var result  = $('#' + id);

        return result.length ? result[0] : null;
    }

    function getByClass(name) {
        var result = $('.' + name);

        return result.length ? result[0] : null;
    }

    function getByTag(name) {
        var result = $(name);

        return result.length ? result[0] : null;
    }

    function addListener(target, eventName, handler) {
        $(target).on(eventName, handler);
    }

    function removeListener(target, eventName, handler) {
        $(target).off(eventName, handler);
    }

    function trigger(target, eventName) {
        $(target).trigger(eventName);
    }

    return {
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