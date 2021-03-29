(function () {
    angular.module('TaskifyApp').service('UtilsService', UtilsService);

    function UtilsService($mdToast, $window) {
        this.sendToast = (text) => {
            $mdToast.show({
                template: '<md-toast class="md-toast">' + text + '</md-toast>',
                hideDelay: 2000,
                position: 'bottom right'
            });
        };

        this.getValueFromStorage = (key) => {
            return $window.localStorage[key];
        };

        this.getObjectFromStorage = (key) => {
            const rawData = $window.localStorage[key];

            if (!rawData) {
                return null;
            }

            return JSON.parse($window.localStorage[key]);
        };

        this.addValueToStorage = (key, value) => {
            $window.localStorage[key] = value;
        };

        this.addObjectToStorage = (key, object) => {
            $window.localStorage[key] = JSON.stringify(object);
        };

        this.deleteValueFromStorage = (key) => {
            $window.localStorage[key] = null;
        };
    }
}());
