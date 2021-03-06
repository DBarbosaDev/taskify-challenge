(function () {
    angular.module('TaskifyApp').controller('LoginController', LoginController);

    function LoginController(LoginService, UtilsService, HttpService, $location, UserModel) {
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

                const User = new UserModel(details.data.data);

                UtilsService.addObjectToStorage('userSessionObject', User);
                HttpService.setSessionToken(User.token);
                UtilsService.sendToast('Success!');

                $location.path('/projects');
            }).catch((err) => {
                self.waitingForResponse = false;
                UtilsService.sendToast('Login error');
            });
        };
    }
}());
