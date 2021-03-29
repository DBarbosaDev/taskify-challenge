(function () {
    angular.module('TaskifyApp').controller('RegistController', RegistController);

    function RegistController(RegistService, UtilsService, $location) {
        const self = this;

        self.waitingForResponse = false;

        self.onRegistFormSubmission = () => {
            const { name, surname, email, password } = self;

            self.waitingForResponse = true;

            RegistService.requestRegist({ name, surname, email, password }).then(() => {
                self.waitingForResponse = false;

                UtilsService.sendToast('Successfully Registered!');

                $location.path('/login');
            }).catch((err) => {
                self.waitingForResponse = false;
                UtilsService.sendToast('Error on Regist');
            });
        };
    }
}());
