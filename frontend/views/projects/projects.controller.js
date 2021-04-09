(function () {
    angular.module('TaskifyApp').controller('ProjectsController', ProjectsController);

    function ProjectsController(ProjectsService, UtilsService, UserModel, ProjectModel, TaskModel, $location, $mdDialog) {
        const self = this;
        self.userFullName = null;
        self.selectedProject = null;
        self.projectsList = [];
        self.tasksList = [];
        self.onLoading = {
            projects: false,
            tasks: false
        };

        self.init = () => {
            const userSessionObject = UtilsService.getObjectFromStorage('userSessionObject');

            if (!userSessionObject) {
                UtilsService.sendToast('Try to login first');
                $location.path('/login');
                return;
            }

            const User = new UserModel(userSessionObject);

            self.userFullName = User.getFullName();

            self.onLoading.projects = true;

            ProjectsService.getMyProjects()
                .then((result = {}) => {
                    const projects = result.data.data;

                    self.projectsList = projects.map((el) => {
                        return new ProjectModel(el);
                    });

                    self.onLoading.projects = false;
                }).catch((error) => {
                    const errorCode = error.data.data;

                    self.onLoading.projects = false;
                });
        };

        self.addProject = (ev) => {
            const confirm = $mdDialog.prompt()
                .title('New Project')
                .clickOutsideToClose(true)
                .placeholder('Name')
                .ariaLabel('Name')
                .targetEvent(ev)
                .required(true)
                .fullscreen(true)
                .ok('Create')
                .cancel('Cancel');

            $mdDialog
                .show(confirm)
                .then((name) => {
                    return ProjectsService.createProject(name)
                        .then((result) => {
                            self.projectsList.push(new ProjectModel(result.data.data));
                            UtilsService.sendToast('Projeto Criado!');
                        })
                        .catch(() => UtilsService.sendToast('Error on project creation'));
                });
        };

        self.addTask = (ev) => {
            const confirm = $mdDialog.prompt()
                .title('New Tasks')
                .clickOutsideToClose(true)
                .placeholder('Description')
                .ariaLabel('Description')
                .targetEvent(ev)
                .required(true)
                .fullscreen(true)
                .ok('Create')
                .cancel('Cancel');

            $mdDialog
                .show(confirm)
                .then((description) => {
                    return ProjectsService.createProjectTask((self.selectedProject || {}).id, description)
                        .then((result) => {
                            self.tasksList.push(new TaskModel(result.data.data));
                            UtilsService.sendToast('Task Criada!');
                        })
                        .catch(() => UtilsService.sendToast('Error on task creation'));
                });
        };

        self.orderTasksListByNonFinished = () => {
            self.tasksList = self.tasksList.sort((a, b) => a.isFinished - b.isFinished);
        };

        self.onTaskToogle = (taskData) => {
            self.orderTasksListByNonFinished();

            taskData.isDisabled = true;

            ProjectsService.updateProjectTask(self.selectedProject.id, taskData.id, { isFinished: taskData.isFinished })
                .then(() => {
                    taskData.isDisabled = false;
                })
                .catch(() => {
                    taskData.isDisabled = false;
                    taskData.isFinished = false;
                });
        };

        self.selectProject = (project) => {
            self.selectedProject = project;

            self.onLoading.tasks = true;

            ProjectsService.getProjectTasks(self.selectedProject.id).then((result = {}) => {
                const tasks = result.data.data;

                self.tasksList = tasks.map((el) => {
                    return new TaskModel(el);
                });

                self.orderTasksListByNonFinished();

                self.onLoading.tasks = false;
            }).catch((error) => {
                const errorCode = error.data.data;

                self.onLoading.tasks = false;
            });
        };
    }
}());
