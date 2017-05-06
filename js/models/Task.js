if (!!!AppScope) {
    var AppScope = {}
}

AppScope.Task = function () {
    this.id;
    this.value;
    this.status; // Enum <TaskStatus.js>
    this.isChecked;
};


AppScope.Task.prototype = {
    fromJSON: function (json) {
        this.id = json.id;
        this.value = json.value;
        this.status = AppScope.TaskStatusEnum.getByCode(json.status);
        this.isChecked = Boolean(json.isChecked);

        return this;
    },

    toJSON: function () {
        return {
            id: this.id,
            value: this.value,
            status: this.status.code,
            isChecked: this.isChecked
        }
    },

    toString: function () {
        return JSON.stringify(this.toJSON());
    }
};