(function () {
    angular.module('TaskifyApp').service('ProjectModel', ProjectModel);

    function ProjectModel() {
        function Model(data = {}) {
            this.id = data._id;
            this.name = data.name;
            this.tasks = data.refTasks;
            this.totalFinishedTasks = data.totalFinishedTasks || 0;
            this.totalTasks = data.totalTasks || 0;
        }

        Model.prototype = {
            getConclusionPercentage() {
                if (!this.totalTasks) {
                    return 0;
                }
                return Math.floor((this.totalFinishedTasks / this.totalTasks) * 100);
            }
        };

        return Model;
    }
}());
