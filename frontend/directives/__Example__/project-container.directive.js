(function () {
    angular.module('TaskifyApp').directive('ifyProjectContainer', () => {
        return {
            templateUrl: './directives/project-container/project-container.template.html',
            link: ifyProjectContainer,
            restrict: 'E',
            scope: {
                userFullName: '='
            }
        };
    });

    function ifyProjectContainer(scope) {
        
    }
}());
