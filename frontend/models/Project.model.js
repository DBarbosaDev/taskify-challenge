(function () {
    angular.module('TaskifyApp').service('ProjectModel', ProjectModel);

    function ProjectModel() {
        return function (data = {}) {
            this.id = data.id;
            this.name = data.name;
            this.tasks = data.tasks;
        };
    }
}());
