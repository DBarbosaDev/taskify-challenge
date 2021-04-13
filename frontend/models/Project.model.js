(function () {
    angular.module('TaskifyApp').service('ProjectModel', ProjectModel);

    function ProjectModel() {
        function Model(data = {}) {
            this.id = data._id;
            this.name = data.name;
            this.tasks = data.refTasks;
            this.totalFinishedTasks = data.totalFinishedTasks;
            this.totalTasks = data.totalTasks;
        }

        Model.prototype = {
            getConclusionPercentage() {
                return Math.floor((this.totalFinishedTasks / this.totalTasks) * 100);
            }
        };

        return Model;
    }
}());
