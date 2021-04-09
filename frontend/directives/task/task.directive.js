(function () {
    angular.module('TaskifyApp').directive('ifyTask', () => {
        return {
            templateUrl: './directives/task/task.template.html',
            link: ifyProjectContainer,
            restrict: 'E',
            scope: {
                data: '=',
                onToogleCallback: '='
            }
        };
    });

    function ifyProjectContainer(scope) {
        scope.data = scope.data || {};
    }
}());
