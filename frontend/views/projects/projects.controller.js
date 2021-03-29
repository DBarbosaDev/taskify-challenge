(function () {
    angular.module('TaskifyApp').controller('ProjectsController', ProjectsController);

    function ProjectsController(ProjectsService, UtilsService, $location, $mdDialog) {
        const self = this;
        self.userFullName = null;

        self.init = () => {
            const userSessionObject = UtilsService.getObjectFromStorage('userSessionObject');

            if (!userSessionObject) {
                UtilsService.sendToast('Try to login first');
                $location.path('/login');
                return;
            }

            self.userFullName = `${userSessionObject.name} ${userSessionObject.surname}`;
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
                        .then(() => UtilsService.sendToast('Projeto Criado!'))
                        .catch(() => UtilsService.sendToast('Error on project creation'));
                });
        };
    }
}());