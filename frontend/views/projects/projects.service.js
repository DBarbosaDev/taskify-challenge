(function () {
    angular.module('TaskifyApp').service('ProjectsService', ProjectsService);

    function ProjectsService(HttpService) {
        this.createProject = (name) => {
            return HttpService.post('/project', { name });
        };

        this.getMyProjects = () => {
            return HttpService.get('/myProjects');
        };

        this.getProjectTasks = (projectId) => {
            return HttpService.get(`/project/${projectId}/tasks`);
        };

        this.createProjectTask = (projectId, description) => {
            return HttpService.post(`/project/${projectId}/task`, { description });
        };
    }
}());
