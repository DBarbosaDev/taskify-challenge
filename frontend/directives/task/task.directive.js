(function () {
    angular.module('TaskifyApp').directive('ifyTask', () => {
        return {
            templateUrl: './directives/task/task.template.html',
            link: ifyProjectContainer,
            restrict: 'E',
            scope: {
                data: '=',
                onToogleCallback: '=',
                onEditCallback: '=',
                onDeleteCallback: '='
            }
        };
    });

    function ifyProjectContainer(scope) {
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
