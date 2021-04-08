(function () {
    angular.module('TaskifyApp').controller('ProjectsController', ProjectsController);

    function ProjectsController(ProjectsService, UtilsService, UserModel, ProjectModel, $location, $mdDialog) {
        const self = this;
        self.userFullName = null;
        self.projectsList = [];
        self.selectedProject = null;
        self.loadingBarsObject = {
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

            self.loadingBarsObject.projects = true;
            ProjectsService.getMyProjects()
                .then((result = {}) => {
                    const projects = result.data.data;

                    self.projectsList = projects.map((el) => {
                        return new ProjectModel(el);
                    });

                    self.loadingBarsObject.projects = false;
                }).catch((error) => {
                    const errorCode = error.data.data;

                    console.log(errorCode);
                    self.loadingBarsObject.projects = false;
                });
        };

        self.addProject = (ev) => {
            const confirm = $mdDialog.prompt()
                .title('New Project')
                .placeholder('Name')
                .ariaLabel('Name')
                .targetEvent(ev)
                .required(true)
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

        self.selectProject = (project) => {
            self.selectedProject = project;
        };
    }
}());
