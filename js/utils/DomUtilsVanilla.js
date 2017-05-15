if (!!!AppScope) {
    var AppScope = {}
}

AppScope.DomUtilsVanilla = (function () {
    function hasClass(target, className) {
        return target.className.indexOf(className) != -1;
    }

    function addClass(target, className) {
        target.className += (target.className ? ' ' : '') + className;
    }

    function removeClass(target, className) {
        var rx = new RegExp('(' + className + ')?', 'g');

        target.className = target.className.replace(rx, '');
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function getByClass(className, parent) {
        var result = parent.getElementsByClassName(className);

        return result.length ? result[0] : null;
    }

    function create(tag) {
        return document.createElement(tag);
    }

    function insertBefore(itemToInsert, target) {
        var parent = target.parentNode;

        parent.insertBefore(itemToInsert, target);
    }

    function setInnerHtml(target, content) {
        target.innerHTML = content;
    }

    function setOuterHtml(target, content) {
        target.outerHTML = content;
    }

    function addListener(target, eventName, handler) {
        target.addEventListener(eventName, handler, false);
    }

    function removeListener(target, eventName, handler) {
        target.removeEventListener(eventName, handler, false);
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