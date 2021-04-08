(function () {
    angular.module('TaskifyApp').service('ProjectModel', ProjectModel);

    function ProjectModel() {
        return function (data = {}) {
            this.id = data._id;
            this.name = data.name;
            this.tasks = data.refTasks;
        };
    }
}());
