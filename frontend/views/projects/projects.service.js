(function () {
    angular.module('TaskifyApp').service('ProjectsService', ProjectsService);

    function ProjectsService(HttpService) {
        this.createProject = (name) => {
            return HttpService.post('/project', { name });
        };

        this.getMyProjects = () => {
            return HttpService.get('/myProjects');
        };

        this.updateProject = (projectId, bodyData) => {
            return HttpService.put(`/project/${projectId}`, bodyData);
        };

        this.deleteProject = (projectId) => {
            return HttpService.delete(`/project/${projectId}`);
        };

        this.getProjectTasks = (projectId) => {
            return HttpService.get(`/project/${projectId}/tasks`);
        };

        this.createProjectTask = (projectId, description) => {
            return HttpService.post(`/project/${projectId}/task`, { description });
        };

        this.updateProjectTask = (projectId, taskId, bodyData) => {
            return HttpService.put(`/project/${projectId}/task/${taskId}`, bodyData);
        };

        this.toggleProjectTask = (projectId, taskId, bodyData) => {
            return HttpService.put(`/project/${projectId}/task/${taskId}/toggle`, bodyData);
        };

        this.deleteProjectTask = (projectId, taskId) => {
            return HttpService.delete(`/project/${projectId}/task/${taskId}`);
        };
    }
}());
