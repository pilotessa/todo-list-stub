if (!!!AppScope) {
    var AppScope = {}
}

AppScope.config = {
    storage: 'localStorage',
    domUtils: 'vanilla'
};

// Initialize Page controller
AppScope.TodoListController.initialize('list');