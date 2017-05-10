if (!!!AppScope) {
    var AppScope = {}
}

AppScope.DomUtils = (function () {
    function hasClass(target, className) {
        return target.className.indexOf(className) != -1;
    }

    return {
        hasClass: hasClass
    }
})();