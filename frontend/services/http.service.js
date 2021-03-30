(function () {
    angular.module('TaskifyApp').service('HttpService', HttpService);

    const apiUri = '/api';

    const defaulPostAndPutHeaders = {
        'Content-Type': 'application/json'
    };

    function HttpService($http) {
        this.setSessionToken = (token = '') => {
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        };

        this.post = (endpoint, body) => {
            const request = {
                method: 'POST',
                url: `${apiUri}${endpoint}`,
                headers: defaulPostAndPutHeaders,
                data: body
            };

            return $http(request);
        };
        this.put = (endpoint, body) => {
            const request = {
                method: 'PUT',
                url: `${apiUri}${endpoint}`,
                headers: defaulPostAndPutHeaders,
                data: body
            };

            return $http(request);
        };
        this.get = (endpoint, query) => {
            const request = {
                method: 'GET',
                url: `${apiUri}${endpoint}`,
                params: query
            };

            return $http(request);
        };

        this.delete = (endpoint) => {
            const request = {
                method: 'DELETE',
                url: `${apiUri}${endpoint}`
            };

            return $http(request);
        };
    }
}());
