if (!!!AppScope) {
    var AppScope = {}
}

AppScope.config = {
    storage: 'localStorage'
};

// Initialize Page controller
AppScope.TodoListController.initialize('list');