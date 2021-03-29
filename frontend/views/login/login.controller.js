(function () {
    angular.module('TaskifyApp').controller('LoginController', LoginController);

    function LoginController(LoginService, UtilsService, HttpService, $location) {
        const self = this;

        self.waitingForResponse = false;

        self.onLoginFormSubmission = () => {
            const { email, password } = self;

            self.waitingForResponse = true;

            LoginService.requestLogin({
                email,
                password
            }).then((details = {}) => {
                self.waitingForResponse = false;

                UtilsService.addObjectToStorage('userSessionObject', details.data.data);
                UtilsService.sendToast('Sucesso');

                $location.path('/projects');
            }).catch((err) => {
                self.waitingForResponse = false;
                UtilsService.sendToast('Error On login');
            });
        };
    }
}());
