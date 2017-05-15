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
        $(target).removeClass(className);
    }

    function getById(id) {
        var result  = $('#' + id);

        return result.length ? result[0] : null;
    }

    function getByClass(className, parent) {
        var result = $(parent).find('.' + className);

        return result.length ? result[0] : null;
    }

    function create(tag) {
        return $('<' + tag + '></' + tag + '>')[0];
    }

    function insertBefore(itemToInsert, target) {
        $(itemToInsert).insertBefore(target);
    }

    function setInnerHtml(target, content) {
        $(target).html(content);
    }

    function setOuterHtml(target, content) {
        $(target).replaceWith(content);
    }

    function addListener(target, eventName, handler) {
        $(target).on(eventName, handler);
    }

    function removeListener(target, eventName, handler) {
        $(target).off(eventName, handler);
    }

    return {
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