if (!!!AppScope) {
    var AppScope = {}
}

AppScope.config = {
    storage: 'localStorage',
    module: 'vanilla'
};

// Initialize Page controller
AppScope.TodoListController.initialize('list');