(function () {
    angular.module('TaskifyApp').directive('ifyProject', () => {
        return {
            templateUrl: './directives/project/project.template.html',
            link: ifyProject,
            restrict: 'E',
            scope: {
                data: '=',
                onEditCallback: '=',
                onDeleteCallback: '='
            }
        };
    });

    function ifyProject(scope) {
        scope.data = scope.data || {};

        scope.changeEditStatus = () => {
            scope.isEditing = !scope.isEditing;
        };

        scope.onEdit = () => {
            scope.isEditing = false;
            scope.onEditCallback(scope.data);
        };

        scope.onDelete = (ev) => {
            scope.onDeleteCallback(ev, scope.data);
        };
    }
}());
