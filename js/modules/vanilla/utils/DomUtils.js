if (!!!AppScope) {
    var AppScope = {}
}
if (!!!AppScope.Vanilla) {
    AppScope.Vanilla = {}
}

AppScope.Vanilla.DomUtils = (function () {
    function hasClass(target, className) {
        return target.className.indexOf(className) != -1;
    }

    function addClass(target, className) {
        target.className += (target.className ? ' ' : '') + className;
    }

    function removeClass(target, className) {
        if (className) {
            var rx = new RegExp('(' + className + ')?', 'g');

            target.className = target.className.replace(rx, '');
        } else {
            target.className = '';
        }
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function getByClass(name) {
        var result = document.getElementsByClassName(name);

        return result.length ? result[0] : null;
    }

    function getByTag(name) {
        var result = document.getElementsByTagName(name);

        return result.length ? result[0] : null;
    }

    function addListener(target, eventName, handler) {
        target.addEventListener(eventName, handler, false);
    }

    function removeListener(target, eventName, handler) {
        target.removeEventListener(eventName, handler, false);
    }

    function trigger(target, eventName) {
        var event = new Event(eventName);

        target.dispatchEvent(event);
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