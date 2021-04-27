(function () {
    angular.module('TaskifyApp').service('RegistService', RegistService);

    function RegistService(HttpService) {
        this.requestRegist = (body) => {
            return HttpService.post('/regist', body);
        };
    }
}());
