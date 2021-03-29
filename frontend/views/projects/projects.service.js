(function () {
    angular.module('TaskifyApp').service('ProjectsService', ProjectsService);

    function ProjectsService(HttpService) {
        this.createProject = (name) => {
            return HttpService.post('/project', { name });
        };
    }
}());
