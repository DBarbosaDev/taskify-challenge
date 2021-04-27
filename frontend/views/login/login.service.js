(function () {
    angular.module('TaskifyApp').service('LoginService', LoginService);

    function LoginService(HttpService) {
        this.requestLogin = (body) => {
            return HttpService.post('/login', body);
        };
    }
}());
