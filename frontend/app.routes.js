(function () {
    angular.module('TaskifyApp').config(AppRouter);

    function AppRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './views/login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'LoginCtrl'
            })
            .state('regist', {
                url: '/regist',
                templateUrl: './views/regist/regist.template.html',
                controller: 'RegistController',
                controllerAs: 'RegistCtrl'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: './views/projects/projects.template.html',
                controller: 'ProjectsController',
                controllerAs: 'ProjectsCtrl',
                resolve: {
                    setServiceSessionToken(HttpService) {
                        HttpService.setSessionToken();
                    }
                }
            });
    }
}());
