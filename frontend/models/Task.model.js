(function () {
    angular.module('TaskifyApp').service('TaskModel', TaskModel);

    function TaskModel() {
        return function (data = {}) {
            this.id = data._id;
            this.description = data.description;
            this.creationDate = data.creationDate;
            this.isFinished = !!data.finishDate;
            this.isDisabled = false;
            this.finishDate = data.finishDate;
        };
    }
}());
