(function () {
    angular.module('TaskifyApp').directive('ifyProject', () => {
        return {
            templateUrl: './directives/project/project.template.html',
            link: ifyProject,
            restrict: 'E',
            scope: {
                data: '='
            }
        };
    });

    function ifyProject(scope) {
        scope.data = scope.data || {};
    }
}());
