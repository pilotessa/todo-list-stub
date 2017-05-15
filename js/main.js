if (!!!AppScope) {
    var AppScope = {}
}

AppScope.config = {
    storage: 'localStorage',
    module: 'jQuery'
};

// Initialize Page controller
AppScope.TodoListController.initialize('list');