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
        addListener: addListener,
        removeListener: removeListener
    }
})();